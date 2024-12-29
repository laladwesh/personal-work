const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000


app.use(express.json())
app.use(cors())

//calling Database function
app.post('/', (req, res) => {
    console.log(req.body); // Log request body
    res.json({ message: "Hello" }); // Send JSON response
});
//route importing and mounting



app.listen(PORT, ()=>{
    console.log("Server Started")
   
})