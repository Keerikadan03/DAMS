import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = user => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    })
}

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        // Check if user already exists
        let user = null;
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance based on role
        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        } else if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }

        // Save the user to the database
        await user.save();

        // Send success response
        res.status(200).json({ success: true, message: 'User successfully created.' });
    } catch (error) {
        // Handle errors
        console.error('Error during user registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
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
            res.status(404).json({message: "User not found"})
        }

        //check if entered password is right
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordMatch){
            res.status(400).json({status: false, message: "Invalid Credentials"})
        }
        
        //generate token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;
        res.status(200).json({status:true, message: 'User logged in Successfully', token, data: {...rest}, role})

    }catch(e){
        res.status(500).json({status:false, message:'Failed to Login'})
        console.log(e);
    }
};