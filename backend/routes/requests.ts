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

        // Pass 2 arguments matching your sendMail signature: (subject, body)
        await sendMail(
            "📝 Setup Request Received",
            `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
                <div style="border-bottom: 1px solid #262629; padding-bottom: 20px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #EDEEF0; letter-spacing: -0.5px;">OpenSetup Workspace</h2>
                </div>
                
                <h3 style="font-size: 16px; font-weight: 600; color: #EDEEF0; margin-top: 0; margin-bottom: 12px;">Setup Request Submitted Successfully</h3>
                
                <p style="color: #888a8e; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    Hi there, your request for <strong style="color: #ffffff;">"${title}"</strong> has been logged into our community moderation queue.
                </p>

                <div style="background-color: #121215; border: 1px solid #212124; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Request ID:</strong> <span style="font-family: monospace; color: #EDEEF0;">${customRequestId}</span></p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Status:</strong> <span style="color: #eab308; font-weight: 600; text-transform: uppercase; font-size: 11px; background-color: rgba(234, 179, 8, 0.1); padding: 2px 8px; border-radius: 6px;">Pending</span></p>
                    <p style="margin: 0; font-size: 13px; color: #888a8e;"><strong>Message:</strong> Your request has been received and has not been worked on yet.</p>
                </div>

                <p style="color: #525256; font-size: 12px; margin: 0; border-top: 1px solid #212124; pt-20px;">
                    Thank you for contributing to OpenSetup! We will keep you updated as our team reviews your setup request.
                </p>
            </div>
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

// Get ALL non-completed requests (status NOT equal to Completed)
router.get('/all', requireAuth, async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const uncompletedRequests = await RequestModel.find({
            status: { $ne: 'Completed' }
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: uncompletedRequests.length,
            data: uncompletedRequests
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

        const validStatuses = ['Pending', 'In progress', 'Completed', 'Rejected'];

        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of the following: ${validStatuses.join(', ')}`
            });
        }

        let statusReason = reason?.trim();

        if (!statusReason) {
            if (status === 'Completed') {
                statusReason = 'Great news! Your requested guide setup has been completed and published.';
            } else if (status === 'In progress') {
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

        // If status is Rejected or Completed, find and delete the document directly
        if (status === 'Rejected' || status === 'Completed') {
            const targetRequest = await RequestModel.findOneAndDelete({
                $or: [{ _id: id }, { requestId: id }]
            });

            if (!targetRequest) {
                return res.status(404).json({
                    success: false,
                    message: 'Target request context record not found.'
                });
            }

            const isCompleted = status === 'Completed';
            const statusColor = isCompleted ? '#10B981' : '#EF4444';
            const statusBg = isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

            // Send notification email to the user
            await sendMail(
                `📋 Setup Request Update: ${targetRequest.title}`,
                `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
                    <div style="border-bottom: 1px solid #262629; padding-bottom: 20px; margin-bottom: 24px;">
                        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #EDEEF0; letter-spacing: -0.5px;">OpenSetup Workspace</h2>
                    </div>
                    
                    <h3 style="font-size: 16px; font-weight: 600; color: #EDEEF0; margin-top: 0; margin-bottom: 12px;">Setup Request Status Update</h3>
                    
                    <p style="color: #888a8e; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                        Hi there, your request for <strong style="color: #ffffff;">"${targetRequest.title}"</strong> has been updated.
                    </p>

                    <div style="background-color: #121215; border: 1px solid #212124; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Request ID:</strong> <span style="font-family: monospace; color: #EDEEF0;">${targetRequest.requestId}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: 600; text-transform: uppercase; font-size: 11px; background-color: ${statusBg}; padding: 2px 8px; border-radius: 6px;">${status}</span></p>
                        <p style="margin: 0; font-size: 13px; color: #888a8e;"><strong>Message:</strong> ${statusReason}</p>
                    </div>

                    <p style="color: #525256; font-size: 12px; margin: 0; border-top: 1px solid #212124; pt-20px;">
                        Thank you for contributing to OpenSetup!
                    </p>
                </div>
                `
            );

            return res.status(200).json({
                success: true,
                message: `Request was ${status.toLowerCase()}, notification email sent, and record removed from database.`,
                data: targetRequest
            });
        }

        // Standard update flow for Pending or In progress statuses
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
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
                <div style="border-bottom: 1px solid #262629; padding-bottom: 20px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #EDEEF0; letter-spacing: -0.5px;">OpenSetup Workspace</h2>
                </div>
                
                <h3 style="font-size: 16px; font-weight: 600; color: #EDEEF0; margin-top: 0; margin-bottom: 12px;">Setup Request Progress Update</h3>
                
                <p style="color: #888a8e; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    Hi there, your request for <strong style="color: #ffffff;">"${updatedRequest.title}"</strong> has been updated.
                </p>

                <div style="background-color: #121215; border: 1px solid #212124; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Request ID:</strong> <span style="font-family: monospace; color: #EDEEF0;">${updatedRequest.requestId}</span></p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>New Status:</strong> <span style="color: #7c3aed; font-weight: 600; text-transform: uppercase; font-size: 11px; background-color: rgba(124, 58, 237, 0.1); padding: 2px 8px; border-radius: 6px;">${status}</span></p>
                    <p style="margin: 0; font-size: 13px; color: #888a8e;"><strong>Update Note:</strong> ${statusReason}</p>
                </div>

                <p style="color: #525256; font-size: 12px; margin: 0; border-top: 1px solid #212124; pt-20px;">
                    Thank you for contributing to OpenSetup!
                </p>
            </div>
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