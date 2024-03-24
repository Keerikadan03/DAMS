import express from 'express'
import { getSingleDoctor,getAllDoctors,updateDoctor,deleteDoctor } from '../controllers/doctorController.js';
import { authenticate,restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js';

const doctorRouter = express.Router()

doctorRouter.use("/:doctorId/reviews", reviewRouter)

doctorRouter.get('/:id',authenticate, restrict(['doctor']),  getSingleDoctor);
doctorRouter.get('/',authenticate, restrict(['doctor']),  getAllDoctors);
doctorRouter.put('/:id',authenticate, restrict(['doctor']),  updateDoctor);
doctorRouter.delete('/:id',authenticate, restrict(['doctor']),  deleteDoctor);

export default doctorRouter;