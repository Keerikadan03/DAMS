import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
    const { selectedIndex } = req.body;
    console.log("selected index", selectedIndex);

    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        console.log("doctor id =>", doctor.timeSlots[selectedIndex]);

        const user = await User.findById(req.userId);
        console.log("user id =>", user);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            client_reference_id: req.params.doctorId,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    unit_amount: doctor.ticketPrice * 100,
                    product_data: {
                        name: doctor.name,
                        description: doctor.specialization,
                    }
                },
                quantity: 1
            }]
        });

        // Mark the selected time slot as booked
        doctor.timeSlots[selectedIndex].isBooked = true;
        await doctor.save();

        // Create a new booking
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id,
            timeSlots: [doctor.timeSlots[selectedIndex]],
            selectedIndex: parseInt(selectedIndex)
        });
        booking.timeSlots[0].isBooked = true;

        await booking.save();

        console.log("Booking details =>", booking);

        res.status(200).json({ success: true, message: "Successfully Paid", session });
    } catch (e) {
        console.log("Error at booking controller =>", e);
        res.status(500).json({ success: false, message: "Payment Failed, Error creating payment session" });
    }
};
