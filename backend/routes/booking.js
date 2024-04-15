import express from 'express'
import { getCheckoutSession } from '../controllers/bookingController.js'
import { authenticate } from '../auth/verifyToken.js';

const bookingRouter = express.Router()

bookingRouter.post('/checkout-session/:doctorId',authenticate, getCheckoutSession)

export default bookingRouter;