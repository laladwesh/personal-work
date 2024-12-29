const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: ['GET', 'POST','PUT'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000


app.use(express.json())

//calling Database function
require('./config/database').connect()

//route importing and mounting
const user = require('./routes/otpRoute')
const auth = require('./routes/authRoute')
app.use('/api/v1', auth)
app.use('/api/v1', user)


app.listen(PORT, ()=>{
    console.log("Server Started")
})