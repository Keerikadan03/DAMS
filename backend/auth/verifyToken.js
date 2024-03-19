import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const authenticate = (req,res, next) => {

    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false, message: 'Unauthorised'});
    }

    try{
        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    }catch(e){
        if(e.name === 'TokenExpiredError'){
            return res.status(401).json({success:false, message: 'Session expired, please login again'});
        }
        console.log("error is => ", e);
        return res.status(401).json({success:false, message: 'Unauthorised || Invalid token'});
    }
}

export const restrict = async(req,res,next) => {
    
}