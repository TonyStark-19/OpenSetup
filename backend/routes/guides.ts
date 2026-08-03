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

        // Send email notification to Super Admins with beautified template
        await sendMail(
            "📘 New Guide Contribution",
            `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
                <div style="border-bottom: 1px solid #262629; padding-bottom: 20px; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #EDEEF0; letter-spacing: -0.5px;">OpenSetup Admin Portal</h2>
                </div>
                
                <h3 style="font-size: 16px; font-weight: 600; color: #EDEEF0; margin-top: 0; margin-bottom: 12px;">New Guide Submitted for Review</h3>
                
                <p style="color: #888a8e; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    A new community setup blueprint has been submitted and awaits moderation in your console.
                </p>

                <div style="background-color: #121215; border: 1px solid #212124; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Title:</strong> <span style="color: #ffffff; font-weight: 500;">${title.trim()}</span></p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Contributor:</strong> <span style="color: #EDEEF0;">${displayContributor} (${userEmail})</span></p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Category:</strong> <span style="color: #a855f7; font-weight: 600;">${formattedCategory}</span></p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Category Type:</strong> <span style="font-family: monospace; color: #EDEEF0;">${formattedType}</span></p>
                    <p style="margin: 0; font-size: 13px; color: #888a8e;"><strong>File Name:</strong> <span style="font-family: monospace; color: #EDEEF0;">${trimmedFileName}</span></p>
                </div>

                <p style="color: #525256; font-size: 12px; margin: 0; border-top: 1px solid #212124; pt: 20px;">
                    Please review this guide in your OpenSetup moderation dashboard.
                </p>
            </div>
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

// Update & Edit guide metadata or toggle status to VERIFIED / REJECTED
router.patch('/update/:id', requireAuth, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        const { mdFileName, title, description, typeOfGuide, categoryOfGuide, status, reason } = req.body;

        // Fetch current document state prior to update
        const existingGuide = await Guide.findById(id);
        if (!existingGuide) {
            return res.status(404).json({
                success: false,
                message: 'Target configuration context record not found.'
            });
        }

        const newStatus = status ? status.trim().toUpperCase() : existingGuide.status;

        // If status is toggled to REJECTED, enforce reason, send email, and delete from database
        if (newStatus === 'REJECTED') {
            const rejectionReason = reason?.trim();

            if (!rejectionReason) {
                return res.status(400).json({
                    success: false,
                    message: 'A specific rejection reason is required when rejecting a guide contribution.'
                });
            }

            const deletedGuide = await Guide.findByIdAndDelete(id);

            if (!deletedGuide) {
                return res.status(404).json({ success: false, message: 'Target guide record not found for deletion.' });
            }

            // Send beautified rejection email notification including the frontend reason
            await sendMail(
                "❌ OpenSetup Guide Review Status",
                `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
                    <div style="border-bottom: 1px solid #262629; padding-bottom: 20px; margin-bottom: 24px;">
                        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #EDEEF0; letter-spacing: -0.5px;">OpenSetup Workspace</h2>
                    </div>
                    
                    <h3 style="font-size: 16px; font-weight: 600; color: #EDEEF0; margin-top: 0; margin-bottom: 12px;">Guide Contribution Review Update</h3>
                    
                    <p style="color: #888a8e; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                        Hi <strong style="color: #ffffff;">${deletedGuide.contributedBy}</strong>, thank you for submitting your guide. After review, our moderation team decided not to publish this submission.
                    </p>

                    <div style="background-color: #121215; border: 1px solid #212124; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Title:</strong> <span style="color: #ffffff;">${deletedGuide.title}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>File Name:</strong> <span style="font-family: monospace; color: #EDEEF0;">${deletedGuide.mdFileName}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Status:</strong> <span style="color: #EF4444; font-weight: 600; text-transform: uppercase; font-size: 11px; background-color: rgba(239, 68, 68, 0.1); padding: 2px 8px; border-radius: 6px;">Rejected</span></p>
                        <p style="margin: 0; font-size: 13px; color: #888a8e;"><strong>Reason:</strong> <span style="color: #EDEEF0;">${rejectionReason}</span></p>
                    </div>

                    <p style="color: #525256; font-size: 12px; margin: 0; border-top: 1px solid #212124; padding-top: 20px;">
                        Thank you for your interest in contributing to OpenSetup! You are welcome to submit other configuration guides.
                    </p>
                </div>
                `
            );

            return res.status(200).json({
                success: true,
                message: 'Guide submission rejected, notification email sent, and record removed from database.',
                data: deletedGuide
            });
        }

        // Prepare selective updates payload for non-rejected statuses
        const updatePayload: Record<string, any> = {};

        if (mdFileName) updatePayload.mdFileName = mdFileName.trim();
        if (title) updatePayload.title = title.trim();
        if (description) updatePayload.description = description.trim();
        if (typeOfGuide) updatePayload.typeOfGuide = typeOfGuide.trim().toUpperCase();
        if (categoryOfGuide) {
            updatePayload.categoryOfGuide =
                categoryOfGuide.trim().charAt(0).toUpperCase() + categoryOfGuide.trim().slice(1).toLowerCase();
        }
        if (status) updatePayload.status = newStatus;

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
            // Extract target notification metrics
            const guideSnapshot = {
                mdFileName: updatedGuide.mdFileName,
                title: updatedGuide.title,
                description: updatedGuide.description,
                typeOfGuide: updatedGuide.typeOfGuide,
                categoryOfGuide: updatedGuide.categoryOfGuide,
                status: updatedGuide.status
            };

            // Notify user/contributor via beautified email
            await sendMail(
                "🚀 Your OpenSetup Guide is Now Live!",
                `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
                    <div style="border-bottom: 1px solid #262629; padding-bottom: 20px; margin-bottom: 24px;">
                        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #EDEEF0; letter-spacing: -0.5px;">OpenSetup Workspace</h2>
                    </div>
                    
                    <h3 style="font-size: 16px; font-weight: 600; color: #EDEEF0; margin-top: 0; margin-bottom: 12px;">Congratulations! Your Guide Contribution is Live</h3>
                    
                    <p style="color: #888a8e; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                        Hi <strong style="color: #ffffff;">${updatedGuide.contributedBy}</strong>, your setup guide contribution has been verified and published to the OpenSetup catalog!
                    </p>

                    <div style="background-color: #121215; border: 1px solid #212124; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Title:</strong> <span style="color: #ffffff;">${guideSnapshot.title}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Description:</strong> <span style="color: #888a8e;">${guideSnapshot.description}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Category:</strong> <span style="color: #a855f7; font-weight: 600;">${guideSnapshot.categoryOfGuide}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>Type:</strong> <span style="font-family: monospace; color: #EDEEF0;">${guideSnapshot.typeOfGuide}</span></p>
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #888a8e;"><strong>File Name:</strong> <span style="font-family: monospace; color: #EDEEF0;">${guideSnapshot.mdFileName}</span></p>
                        <p style="margin: 0; font-size: 13px; color: #888a8e;"><strong>Status:</strong> <span style="color: #10B981; font-weight: 600; text-transform: uppercase; font-size: 11px; background-color: rgba(16, 185, 129, 0.1); padding: 2px 8px; border-radius: 6px;">${guideSnapshot.status}</span></p>
                    </div>

                    <p style="color: #525256; font-size: 12px; margin: 0; border-top: 1px solid #212124; padding-top: 20px;">
                        Thank you for giving back to the open source community!
                    </p>
                </div>
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