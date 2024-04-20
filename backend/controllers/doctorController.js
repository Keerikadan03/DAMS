import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Doctor successfully updated",
        data: updateDoctor,
      });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update" });
    console.log(e);
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to delete" });
    console.log(e);
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res
      .status(200)
      .json({ success: true, message: "Doctor found", data: doctor });
  } catch (e) {
    res.status(404).json({ success: false, message: "Doctor not found" });
    console.log(e);
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ 
        // isApproved: "approved" 
      }).select(
        "-password"
      );
      res
        .status(200)
        .json({ success: true, message: "Users found", data: doctors });
    }
  } catch (e) {
    res.status(404).json({ success: false, message: "Users not found" });
    console.log(e);
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      res.status(404).json({ status: false, message: "Doctor Not Found" });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({doctor:doctorId})

    res
      .status(200)
      .json({
        status: true,
        message: "Doctor Profile is => ",
        data: { ...rest, appointments },
      });
  } catch (e) {
    res.status(500).json({ status: false, message: "Something went wrong" });
    console.log("Error at getting profile is => ", e);
  }
};
