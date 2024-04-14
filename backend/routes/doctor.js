import express from 'express'
import { getSingleDoctor,getAllDoctors,updateDoctor,deleteDoctor, getDoctorProfile } from '../controllers/doctorController.js';
import { authenticate,restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js';

const doctorRouter = express.Router()

doctorRouter.use("/:doctorId/reviews", reviewRouter)

doctorRouter.get('/:id',authenticate, restrict(['doctor']),  getSingleDoctor);
doctorRouter.get('/', getAllDoctors);
doctorRouter.put('/:id',authenticate, restrict(['doctor']),  updateDoctor);
doctorRouter.delete('/:id',authenticate, restrict(['doctor']),  deleteDoctor);
doctorRouter.get('/profile/me',authenticate, restrict(['doctor']),  getDoctorProfile);

export default doctorRouter;