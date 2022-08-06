// importing dependencies starts //
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const uplaodRoutes = require("./routes/router")

dotenv.config()



// creating our server //
const app = express()

// prity port 
const Port = process.env.config | 3001

// middleware section
app.use(express.json())

// routes
app.use("/", uplaodRoutes)
const dbAndServerFunction = async () => {
    try {
      // connecting to mongodb //
const mongooseResponse = await mongoose.connect(process.env.MONGU_URL, 
    {
        useNewUrlParser: true,
        useUnifiedToPology: true
    })
    //starting server when connected to mongoDb
   mongooseResponse && app.listen(Port, () => {
    console.log(`mongoDb connected and server running on port ${Port}`)
}) 
    
  } catch (error) {
    console.log(error.message)
    
  }
}

dbAndServerFunction()