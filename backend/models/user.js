const {Schema,model, default: mongoose} = require("mongoose")
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    myOrders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }]
    
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified){
        return next()
    }
    const hashedPassword = await bcrypt.hash(this.password,10)
    this.password = hashedPassword
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User",userSchema)

module.exports = User