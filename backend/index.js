import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import doctorRouter from './routes/doctor.js'
import reviewRouter from './routes/review.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true
}

app.get('/', (req,res) => {
    res.send('API is working')
})

mongoose.set('strictQuery', false)
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL
        // , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
        )
        console.log('MongoDB database is connected')
    }catch(e){
        console.log('MongoDB database is failed =>', e)
    }
}

//middleware
    
app.use(express.json())
app.use(cors(corsOptions))
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/reviews', reviewRouter);

app.listen(port, ()=> {
    connectDB()
    console.log('Server is running on port', port)
})