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
        const authUser = (req as any).user as { id: string; email: string; name?: string; username?: string } | undefined;
        const userEmail = authUser?.email;

        if (!title || !userEmail || !mdFileName || !description || !typeOfGuide || !categoryOfGuide) {
            return res.status(400).json({
                success: false,
                message: 'All core configuration parameters are required.'
            });
        }

        const trimmedFileName = mdFileName.trim();

        const existingGuide = await Guide.findOne({ mdFileName: trimmedFileName });
        if (existingGuide) {
            return res.status(400).json({
                success: false,
                message: 'A guide with this markdown filename prefix identifier already exists.'
            });
        }

        // Extract clean display username (e.g., "adityachandel" from "adityachandel@gmail.com")
        const displayContributor = authUser?.username || authUser?.name || userEmail.split('@')[0];

        // Format category and guide type values to match frontend badge conventions
        const formattedCategory = categoryOfGuide.trim().charAt(0).toUpperCase() + categoryOfGuide.trim().slice(1).toLowerCase();
        const formattedType = typeOfGuide.trim().toUpperCase();

        // Create the document with clean defaults matching frontend consumption interface
        const newGuide = await Guide.create({
            mdFileName: trimmedFileName,
            title: title.trim(),
            description: description.trim(),
            contributedBy: displayContributor,
            profileImage: '/other/Profile.png',
            typeOfGuide: formattedType,
            categoryOfGuide: formattedCategory,
            mdFileUrl: mdFileUrl ? mdFileUrl.trim() : `https://opensetup-guides.s3.amazonaws.com/${trimmedFileName}`,
            upvotes: 0,
            views: 0,
            status: 'PENDING' // Set to PENDING for moderation or VERIFIED if auto-published
        });

        // Send email notification to Super Admins
        await sendMail(
            "📘 New Guide Contribution",
            `
    <h2>New Guide Submitted</h2>

    <p><strong>Title:</strong> ${title.trim()}</p>
    <p><strong>Contributor:</strong> ${displayContributor} (${userEmail})</p>
    <p><strong>Category:</strong> ${formattedCategory}</p>
    <p><strong>Category Type:</strong> ${formattedType}</p>
    <p><strong>File Name:</strong> ${trimmedFileName}</p>

    <hr/>

    <p>Please review this guide in OpenSetup admin console.</p>
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

// Retrieve all indexed workspace configuration guides (Only VERIFIED)
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

// Retrieve all unverified guides (status NOT equal to VERIFIED) for admin review
router.get('/pending', requireAuth, async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const unverifiedGuides = await Guide.find({
            status: { $ne: 'VERIFIED' }
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: unverifiedGuides.length,
            data: unverifiedGuides
        });
    } catch (error) {
        next(error);
    }
});

// Update & Edit guide metadata or toggle status to VERIFIED
router.patch('/update/:id', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        const { mdFileName, title, description, typeOfGuide, categoryOfGuide, status } = req.body;

        // Fetch current document state prior to update
        const existingGuide = await Guide.findById(id);
        if (!existingGuide) {
            return res.status(404).json({
                success: false,
                message: 'Target configuration context record not found.'
            });
        }

        // Prepare selective updates payload
        const updatePayload: Record<string, any> = {};

        if (mdFileName) updatePayload.mdFileName = mdFileName.trim();
        if (title) updatePayload.title = title.trim();
        if (description) updatePayload.description = description.trim();
        if (typeOfGuide) updatePayload.typeOfGuide = typeOfGuide.trim().toUpperCase();
        if (categoryOfGuide) {
            updatePayload.categoryOfGuide =
                categoryOfGuide.trim().charAt(0).toUpperCase() + categoryOfGuide.trim().slice(1).toLowerCase();
        }
        if (status) updatePayload.status = status.trim().toUpperCase();

        // Perform document update
        const updatedGuide = await Guide.findByIdAndUpdate(id, updatePayload, {
            new: true,
            runValidators: true
        });

        if (!updatedGuide) {
            return res.status(404).json({ success: false, message: 'Failed updating target guide document.' });
        }

        // Check if status was toggled to VERIFIED in this transaction
        const becameVerified = existingGuide.status !== 'VERIFIED' && updatedGuide.status === 'VERIFIED';

        if (becameVerified) {
            // Extract target notification metrics (only specified fields)
            const guideSnapshot = {
                mdFileName: updatedGuide.mdFileName,
                title: updatedGuide.title,
                description: updatedGuide.description,
                typeOfGuide: updatedGuide.typeOfGuide,
                categoryOfGuide: updatedGuide.categoryOfGuide,
                status: updatedGuide.status
            };

            // Notify user/contributor via email
            await sendMail(
                "🚀 Your OpenSetup Guide is Now Live!",
                `
    <h2>Congratulations! Your Guide Contribution is Live</h2>

    <p>Hi <strong>${updatedGuide.contributedBy}</strong>,</p>
    <p>Your setup guide contribution has been verified and published to OpenSetup catalog!</p>

    <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 8px 0;"><strong>Title:</strong> ${guideSnapshot.title}</p>
        <p style="margin: 0 0 8px 0;"><strong>Description:</strong> ${guideSnapshot.description}</p>
        <p style="margin: 0 0 8px 0;"><strong>Category:</strong> ${guideSnapshot.categoryOfGuide}</p>
        <p style="margin: 0 0 8px 0;"><strong>Type:</strong> ${guideSnapshot.typeOfGuide}</p>
        <p style="margin: 0 0 8px 0;"><strong>File Name:</strong> ${guideSnapshot.mdFileName}</p>
        <p style="margin: 0;"><strong>Status:</strong> <span style="color: #10B981; font-weight: bold;">${guideSnapshot.status}</span></p>
    </div>

    <hr/>

    <p>Thank you for giving back to the open source community!</p>
    `
            );
        }

        return res.status(200).json({
            success: true,
            message: becameVerified
                ? 'Guide updated, verified, and live notification email sent to contributor.'
                : 'Guide record parameters updated successfully.',
            data: updatedGuide
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