import 'dotenv/config';   
import express from 'express';
import cors from 'cors';
import connectDB from '../utils/db.js';
import authRouter from '../routes/auth.js';
import userRouter from '../routes/user.js';
import doctorRouter from '../routes/doctor.js';
import reviewRouter from '../routes/review.js';
import bookingRouter from '../routes/booking.js';

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

// Database connection
let isConnected = false;
async function initDb() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

// Initialize DB connection
initDb().catch(console.error);

// For local dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;