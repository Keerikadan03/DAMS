// index.js
import express from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../utils/db.js';
import authRouter from '../routes/auth.js';
import userRouter from '../routes/user.js';
import doctorRouter from '../routes/doctor.js';
import reviewRouter from '../routes/review.js';
import bookingRouter from '../routes/booking.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.send('API is working');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

let isConnected = false;
async function initDb() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

initDb();

// Export the serverless handler for Vercel
export const handler = serverless(app);