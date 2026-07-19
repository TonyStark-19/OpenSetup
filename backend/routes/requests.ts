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
            status: 'Open'
        });

        await sendMail(
            "📝 New Setup Request",
            `
    <h2>New Setup Request</h2>

    <p><strong>Requested By:</strong> ${userEmail}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Description:</strong> ${description}</p>

    <hr/>

    <p>A new guide request has been submitted.</p>
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

// export router
export default router;