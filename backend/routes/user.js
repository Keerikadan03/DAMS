import { updateUser, deleteUser, getSingleUser, getAllUsers } from "../controllers/userController";
import express from 'express'

const router = express.Router()

router.get('/:id', getSingleUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.put('/:id', deleteUser);

export default router;