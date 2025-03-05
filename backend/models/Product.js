const {Schema,model} = require("mongoose")

const productSchema = new Schema({
    thumbnail:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true})

const Product = model("Product",productSchema)

module.exports = Product