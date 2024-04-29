import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  startingTime: { type: String, required: true },
  endingTime: { type: String, required: true },
  day: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    timeSlots: [timeSlotSchema],
    selectedIndex: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
