// import dependencies
import { Router, Request, Response, NextFunction } from 'express';

// import auth middleware
import { requireAuth } from '../middleware/auth';

// import model
import { RequestModel } from '../models/Request';

// import mail system
import { sendMail } from '../utils/mail';

// initialise router
const router = Router();

// Create a new blueprint request (Max 4 active)
router.post('/', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { title, tags, description } = req.body;

        // Cast req.user to access your custom properties safely
        const authUser = (req as any).user as { id: string; email: string; } | undefined;
        const userEmail = authUser?.email;

        if (!title || !userEmail) {
            return res.status(400).json({ success: false, message: 'Guide title is required' });
        }

        // 1. Enforce the 4 active requests limit rule
        const activeCount = await RequestModel.countDocuments({
            email: userEmail,
            status: { $ne: 'Rejected' }
        });

        if (activeCount >= 4) {
            return res.status(400).json({
                success: false,
                message: 'Active request limit reached. You can maintain up to 4 active slots max.'
            });
        }

        // 2. Generate the custom ID format: req_{cleaned_name}_{random_numbers}
        const cleanedName = title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10);
        const randomNumbers = Math.floor(100000 + Math.random() * 900000);
        const customRequestId = `req_${cleanedName}_${randomNumbers}`;

        // 3. Create and save document
        const newRequest = await RequestModel.create({
            requestId: customRequestId,
            email: userEmail,
            title: title.trim(),
            tags: tags && tags.length > 0 ? tags : ['General'],
            description: description?.trim(),
            status: 'Pending',
            statusReason: 'Your request has been received and has not been worked on yet.'
        });

        await sendMail(
            "📝 Setup Request Received",
            `
    <h2>Setup Request Submitted</h2>

    <p>Hi there,</p>
    <p>Your request for <strong>"${title}"</strong> (${userEmail}) has been logged into our workspace queue.</p>
    
    <p><strong>Request ID:</strong> ${customRequestId}</p>
    <p><strong>Status:</strong> Pending</p>
    <p><strong>Status Message:</strong> Your request has been received and has not been worked on yet.</p>

    <hr/>

    <p>We will keep you updated as our team reviews your guide setup request.</p>
    `
        );

        return res.status(201).json({
            success: true,
            message: 'Request submitted successfully',
            data: newRequest
        });
    } catch (error) {
        next(error);
    }
});

// Get all requests submitted by the logged-in user
router.get('/my-requests', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const authUser = (req as any).user as { id: string; email: string; } | undefined;
        const userEmail = authUser?.email;

        const requests = await RequestModel.find({ email: userEmail }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        next(error);
    }
});

// Get ALL requests
router.get('/all', requireAuth, async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const allRequests = await RequestModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: allRequests.length,
            data: allRequests
        });
    } catch (error) {
        next(error);
    }
});

// Update Request Status and Reason
router.patch('/update/:id', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;

        const validStatuses = ['Pending', 'In progress', 'Rejected'];

        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of the following: ${validStatuses.join(', ')}`
            });
        }

        let statusReason = reason?.trim();

        if (!statusReason) {
            if (status === 'In progress') {
                statusReason = 'Yes, your guide is currently in work!';
            } else if (status === 'Pending') {
                statusReason = 'Your request has been received and has not been worked on yet.';
            } else if (status === 'Rejected') {
                return res.status(400).json({
                    success: false,
                    message: 'A specific rejection reason is required when rejecting a request.'
                });
            }
        }

        const updatedRequest = await RequestModel.findOneAndUpdate(
            { $or: [{ _id: id }, { requestId: id }] },
            { status, statusReason },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: 'Target request context record not found.'
            });
        }

        await sendMail(
            `📋 Setup Request Updated: ${updatedRequest.title}`,
            `
    <h2>Setup Request Status Update</h2>

    <p>Hi,</p>
    <p>Your request for <strong>"${updatedRequest.title}"</strong> (${updatedRequest.email}) has been updated.</p>

    <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 8px 0;"><strong>Request ID:</strong> ${updatedRequest.requestId}</p>
        <p style="margin: 0 0 8px 0;"><strong>New Status:</strong> <span style="color: #7c3aed; font-weight: bold;">${status}</span></p>
        <p style="margin: 0;"><strong>Update Note:</strong> ${statusReason}</p>
    </div>

    <hr/>

    <p>Thank you for contributing to OpenSetup!</p>
    `
        );

        return res.status(200).json({
            success: true,
            message: 'Request status updated and notification email sent.',
            data: updatedRequest
        });
    } catch (error) {
        next(error);
    }
});

// export router
export default router;