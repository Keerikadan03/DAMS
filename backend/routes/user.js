import { getSingleUser,getAllUsers,updateUser,deleteUser, getUserProfile, getAllAppointments } from '../controllers/userController.js';
import express from 'express'
import { authenticate,restrict } from '../auth/verifyToken.js';

const userRouter = express.Router()

userRouter.get('/:id',authenticate, restrict(['patient']), getSingleUser);
userRouter.get('/',authenticate, restrict(['admin']),  getAllUsers);
userRouter.put('/:id',authenticate, restrict(['patient']),  updateUser);
userRouter.delete('/:id',authenticate, restrict(['patient']),  deleteUser);
userRouter.get('/profiles/me',authenticate, restrict(['patient']),  getUserProfile);
userRouter.delete('/appointments/my-appointments',authenticate, restrict(['patient']), getAllAppointments);

export default userRouter;