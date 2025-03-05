const{Schema,model} = require("mongoose")

const AddressSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    adress1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const Address = model("Address",AddressSchema)

module.exports = Address