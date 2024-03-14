import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try{
        let user = null;

        //checking if user already exists
        if(role === 'patient'){
            user = User.findOne({email})
        }else if(role === 'doctor'){
            user = Doctor.findOne({email})
        }

        if(user){
            return res.status(409).json({message: 'User already exists'})
        }

        //no existing user found so create new user
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //if user is a patient
        if(role === 'patient'){
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            })
        }

        //if user is a doctor
        if(role === 'doctor'){
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            })
        }

        await user.save()
        res.status(200).json({success: true,message: 'User successfully created.'})

    }catch(e){
        res.status(200).json({success: false,message: 'internal server error'})
        console.log(e);
    }
};

export const login = async(req, res) => {
    try{

    }catch(e){
        console.log(e);
    }
};