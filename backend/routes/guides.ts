// import dependencies
import { Router, Request, Response, NextFunction } from 'express';

// import middleware
import { requireAuth } from '../middleware/auth';

// import model
import { Guide } from '../models/Guide';

// import mail system
import { sendMail } from '../utils/mail';

// initialise router
const router = Router();

// Submit a new setup guide configuration
router.post('/contribute', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { mdFileName, title, description, typeOfGuide, categoryOfGuide, mdFileUrl } = req.body;

        // Cast req as any to resolve the Property 'user' does not exist type error safely
        const authUser = (req as any).user as { id: string; email: string } | undefined;
        const userEmail = authUser?.email;

        if (!title || !userEmail || !mdFileName || !description || !typeOfGuide || !categoryOfGuide) {
            return res.status(400).json({
                success: false,
                message: 'All core configuration parameters are required.'
            });
        }

        const existingGuide = await Guide.findOne({ mdFileName: mdFileName.trim() });
        if (existingGuide) {
            return res.status(400).json({
                success: false,
                message: 'A guide with this markdown filename prefix identifier already exists.'
            });
        }

        // Create the document, prioritizing the incoming AWS S3 URL from frontend
        const newGuide = await Guide.create({
            mdFileName: mdFileName.trim(),
            title: title.trim(),
            description: description.trim(),
            contributedBy: userEmail,
            typeOfGuide: typeOfGuide.trim(),
            categoryOfGuide: categoryOfGuide.trim(),
            // Uses the provided AWS S3 URL, fall back to Github storage reference only if blank
            mdFileUrl: mdFileUrl ? mdFileUrl.trim() : `https://opensetup-guides.s3.amazonaws.com/${mdFileName.trim()}`,
            upvotes: 0,
            views: 0,
            status: 'Active'
        });

        // send email
        await sendMail(
            "📘 New Guide Contribution",
            `
    <h2>New Guide Submitted</h2>

    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Contributor:</strong> ${userEmail}</p>
    <p><strong>Category:</strong> ${categoryOfGuide}</p>
    <p><strong>Type:</strong> ${typeOfGuide}</p>
    <p><strong>File:</strong> ${mdFileName}</p>

    <hr/>

    <p>Please review this guide in OpenSetup.</p>
    `
        );

        return res.status(201).json({
            success: true,
            message: 'Setup configuration guide logged into system index.',
            data: newGuide
        });
    } catch (error) {
        next(error);
    }
});

// Retrieve all indexed workspace configuration guides
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Find guides that are Verified
        const guides = await Guide.find({
            status: 'VERIFIED'
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: guides.length,
            data: guides
        });
    } catch (error) {
        next(error);
    }
});

// Retrieve the top 5 guides sorted by popularity (views + upvotes)
router.get('/top', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const topGuides = await Guide.aggregate([
            // 1. Filter for valid operational states
            {
                $match: {
                    status: 'VERIFIED'
                }
            },
            // 2. Compute a dynamic popularity metric score fields row
            {
                $addFields: {
                    popularityScore: { $add: ['$views', '$upvotes'] }
                }
            },
            // 3. Sort by popularity score descending
            {
                $sort: { popularityScore: -1 }
            },
            // 4. Cap the retrieval array to exactly 5 elements
            {
                $limit: 5
            }
        ]);

        return res.status(200).json({
            success: true,
            count: topGuides.length,
            data: topGuides
        });
    } catch (error) {
        next(error);
    }
});

// Atomically increment upvote counter payload metric
router.patch('/:id/upvote', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;

        const updatedGuide = await Guide.findByIdAndUpdate(
            id,
            { $inc: { upvotes: 1 } },
            { new: true, runValidators: true }
        );

        if (!updatedGuide) {
            return res.status(404).json({ success: false, message: 'Target configuration context record not found.' });
        }

        return res.status(200).json({
            success: true,
            upvotes: updatedGuide.upvotes
        });
    } catch (error) {
        next(error);
    }
});

// Atomically increment view footprint tracking counter metrics
router.patch('/:id/view', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;

        const updatedGuide = await Guide.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedGuide) {
            return res.status(404).json({ success: false, message: 'Target configuration context record not found.' });
        }

        return res.status(200).json({
            success: true,
            views: updatedGuide.views
        });
    } catch (error) {
        next(error);
    }
});

// export router
export default router;