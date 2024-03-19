import express from 'express'
import { getSingleDoctor,getAllDoctors,updateDoctor,deleteDoctor } from '../controllers/doctorController.js';

const doctorRouter = express.Router()

doctorRouter.get('/:id', getSingleDoctor);
doctorRouter.get('/', getAllDoctors);
doctorRouter.put('/:id', updateDoctor);
doctorRouter.delete('/:id', deleteDoctor);

export default doctorRouter;