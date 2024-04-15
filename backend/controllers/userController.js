import User from "../models/UserSchema.js";
import Booking from '../models/BookingSchema.js'
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async(req,res) => {
    const id = req.params.id
    try{
        const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        res.status(200).json({success:true, message: 'User successfully updated', data: updateUser});
    }catch(e){
        res.status(500).json({success:false, message: 'Failed to update'});
        console.log(e);
    }
}

export const deleteUser = async(req,res) => {
    const id = req.params.id
    try{
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message: 'Successfully deleted'});
    }catch(e){
        res.status(500).json({success:false, message: 'Failed to delete'});
        console.log(e);
    }
}

export const getSingleUser = async(req,res) => {
    const id = req.params.id

    try{
        const user = await User.findById(id).select("-password")
        res.status(200).json({success:true, message: 'User found', data: user});

    }catch(e){
        res.status(404).json({success:false, message: 'User not found'});
        console.log(e);
    }
}

export const getAllUsers = async(req,res) => {
    try{
        const users = await User.find({}).select("-password")
        res.status(200).json({success:true, message: 'Users found', data: users});
    }catch(e){
        res.status(404).json({success:false, message: 'Users not found'});
        console.log(e);
    }
};

export const getUserProfile = async(req,res) => {
    const userId = req.userId;
    
    try{
        const user = await User.findById(userId)
        console.log(userId);

        if(!user){
            res.status(404).json({status:false, message: 'User Not Found'})
        }
        const {password, ...rest} = user._doc

        res.status(200).json({status:true, message: 'User Profile is => ', data:{...rest}})

    }catch(e){
        res.status(500).json({status:false, message: 'Something went wrong'})
        console.log('Error at getting profile pic is => ', e)
    }
};

export const getAllAppointments = async(req,res) => {
    try{
        //1 => return appointments from booking
        const bookings = await Booking.find({user:req.userId})
        console.log("bookings are =>",bookings)
        //2 => extract doctor id from appointments
        const doctorIds = bookings.map(el => el.doctor.toString())
        
        console.log("doctor id maps => ", doctorIds)
        //3 => retrieve doctor from doctor id
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select("-password")
        console.log("doctors are => ", doctors)
        res.status(200).json({status:true,message:"Appointments Received", data:doctors})

    }catch(e){
        console.log('Error at getting appointments => ',e);
        res.status(500).json({status:false, message:"Error getting Appointments"})
    }
}
