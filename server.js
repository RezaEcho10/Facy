import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes/User.js'


const app = express()
app.use(helmet())
app.use(cookieParser())
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0:27017/facy', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.log(error))


app.use(router)


app.listen(1000, (req , res) => {
    console.log("Server Running");
})