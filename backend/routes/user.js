import { getSingleUser,getAllUsers,updateUser,deleteUser } from '../controllers/userController.js';
import express from 'express'

const userRouter = express.Router()

userRouter.get('/:id', getSingleUser);
userRouter.get('/', getAllUsers);
userRouter.put('/:id', updateUser);
userRouter.put('/:id', deleteUser);

export default userRouter;