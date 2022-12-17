require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connectDb } = require( "./configs/mongoose.config")

const { errorHandler } = require('./middlewares/error.handler')
const routes = require('./routes')

const app = express()
const PORT = 5070

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v2', routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Deal API is running on port: ' + PORT)
  connectDb()
})