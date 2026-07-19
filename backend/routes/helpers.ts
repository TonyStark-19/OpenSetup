// import dependencies
import { Router, Request, Response, NextFunction } from 'express';

// import model
import { Guide } from '../models/Guide';

// initialise router
const router = Router();

// Retrieve only the title of the absolute newest verified/active guide
router.get('/helper/newest-title', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const newestGuide = await Guide.findOne({
            status: { $in: ['VERIFIED'] }
        })
            .select('title') // Exclude all other fields for optimization
            .sort({ createdAt: -1 });

        if (!newestGuide) {
            return res.status(404).json({
                success: false,
                message: 'No active or verified configuration guides found.'
            });
        }

        return res.status(200).json({
            success: true,
            title: newestGuide.title
        });
    } catch (error) {
        next(error);
    }
});

// Get the total count of all active or verified guides in the database
router.get('/helper/count', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const totalCount = await Guide.countDocuments({
            status: { $in: ['VERIFIED'] }
        });

        return res.status(200).json({
            success: true,
            count: totalCount
        });
    } catch (error) {
        next(error);
    }
});

// export router
export default router;