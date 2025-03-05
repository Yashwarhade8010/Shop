
const mongoose  = require("mongoose")
require("dotenv").config()

const mongoConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected at ${mongoose.connection.host}`)
    }catch(err){
        console.log(err)
    }
}

module.exports = mongoConnection