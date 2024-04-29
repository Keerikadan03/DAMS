import { getSingleUser,getAllUsers,updateUser,deleteUser, getUserProfile, getAllAppointments,getTimeSlotDetails } from '../controllers/userController.js';
import express from 'express'
import { authenticate,restrict } from '../auth/verifyToken.js';

const userRouter = express.Router()

userRouter.get('/:id',authenticate, getSingleUser);
userRouter.get('/',authenticate, restrict(['admin']),  getAllUsers);
userRouter.put('/:id',authenticate, restrict(['patient']),  updateUser);
userRouter.delete('/:id',authenticate, restrict(['patient']),  deleteUser);
userRouter.get('/profile/me',authenticate, restrict(['patient']),  getUserProfile);
userRouter.get('/appointments/my-appointments',authenticate, restrict(['patient']), getAllAppointments);
userRouter.get('/appointments/timeslots',authenticate, restrict(['patient']), getTimeSlotDetails);
export default userRouter;