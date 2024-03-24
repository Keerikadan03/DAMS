import Review from "../models/ReviewSchema.js"
import DoctorSchema from "../models/DoctorSchema.js"

export const getAllReviews = async(req,res) => {
    try{
        const reviews = await Review.find({});
        res.status(200).json({success:true, message: 'Reviews fetched successfully', data: reviews});
        console.log(reviews);
    }catch(e){
        res.status(404).json({success:false,message: "No reviews found"})
        console.log("Error is => ", e);
    }
}

export const createReview = async(req,res) => {

    if(!req.body.doctor) req.body.doctor = req.params.doctorId;
    if(!req.body.user) req.body.user = req.userId;

    const newReview = new Review(req.body);

    try{
        const savedReview = await newReview.save();
        await DoctorSchema.findByIdAndUpdate(req.body.doctor, {
            $push: {reviews: savedReview._id}
        })
        res.status(200).json({success:true,message:"Review Submitted", data:savedReview})
    }catch(e){
        console.log("Error is => ", e);
        res.status(500).json({success:false,message:"Review Not Submitted"})

    }
}