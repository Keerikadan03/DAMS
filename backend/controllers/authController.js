import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = user => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    })
}

export const register = async(req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try{
        let user = null;

        //checking if user already exists
        if(role === 'patient'){
            user = await User.findOne({email})
        }else if(role === 'doctor'){
            user = await Doctor.findOne({email})
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
    const { email, password } = req.body;
    try{
        let user = null;

        const patient = User.findOne({email})
        const doctor = Doctor.findOne({email})

        if(patient){
            user = patient
        }
        if(doctor){
            user = doctor
        }

        // is no user found check if user is registered

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        //check if entered password is right
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({status: false, message: "Invalid Credentials"})
        }
        
        //generate token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;
        return res.status(200).json({status:true, message: 'User logged in Successfully', token, data: {...rest}, role})

    }catch(e){
        return res.status(500).json({status:false, message:'Failed to Login'})
        console.log(e);
    }
};