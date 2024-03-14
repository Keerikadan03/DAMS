import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookieparser';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true
}

app.get('/', (req, res) => {
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
        console.log('MongoDb database is connected')
    }catch(e){
        console.log('MongoDb database is failed =>', e)
    }
}

//middleware

app.use(express.json())
app.use(cookieParser)
app.use(cors(corsOptions))

app.listen(port, ()=> {
    connectDB()
    console.log('Server is running on port', port)
})