import app from './server.js'
import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config() //config .env file

const server = http.Server(app)

const PORT = process.env.PORT || 8080

mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB Connected`)

    server
      .listen(PORT, () => {
        console.log(
          `Server Running in ${process.env.NODE_ENVIRONMENT} mode on PORT ${PORT}`
        )
      })
      .on('error', (err) => {
        console.log('Error', err.message)
        process.exit()
      })
  })
  .catch((err) => {
    process.exit()
  })
