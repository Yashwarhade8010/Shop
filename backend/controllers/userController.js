const { gentrateToken } = require("../config/auth")

const User = require("../models/user")

const handleSignup = async(req,res)=>{

    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields required"
        })
    }

    try{
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }
        const user = await User.create({
            name,
            email,
            password
        })
        return res.status(201).json({
            message:"Logged in successfully",
            user:{
                name : user.name,
                email : user.email,
                token : gentrateToken(user)
            }
            
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({data:{message:"Error occured"}})
    }

}

const handleSignin = async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({data:{
            message:"All fields required"
        }})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        const verify = await user.matchPassword(password)
        if(!verify){
            return res.status(401).json({message:"Invalid credentials"})
        }else{
            return res.status(200).json({message:"Logged in successfully",
                    user:{
                        _id : user._id,
                        name : user.name,
                        email : user.email,
                        token : gentrateToken(user)
                    }
                }
            )
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Error occured"})
    }
}

const addMyOrders = async(req,res)=>{
    const {userId,atcproducts} = req.body
    const myOrders = await User.findById( userId ).populate("myOrders")
   
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { myOrders: [...myOrders.myOrders, ...atcproducts.map((item) => item._id)] },{ new: true }
          ).populate("myOrders");
        res.status(201).json(user.myOrders)
    }catch(err){
        console.log(err)
        res.send("error occures")
    }
}

const getMyOrders = async(req,res)=>{
    const {userId} =req.body
    try{
        const user = await User.findById(userId).populate("myOrders")
        res.status(200).json(user.myOrders)
    }catch(err){
        res.status(400).json({message:"failed to fetch products"})
        console.log(err)
    }
}
module.exports={
    handleSignup,
    handleSignin,
    addMyOrders,
    getMyOrders
}