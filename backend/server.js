import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

// app.use('/api/certificates', certificateRoute)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`🚀 Server started on port ${process.env.PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err))