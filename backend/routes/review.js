import express from 'express'
import { getAllReviews,createReview } from "../controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js"

const reviewRouter = express.Router({mergeParams:true});

reviewRouter.route('/').get(getAllReviews).post(authenticate,restrict(['patient']), createReview);

export default reviewRouter;