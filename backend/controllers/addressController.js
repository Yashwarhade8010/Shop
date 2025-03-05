const Address = require("../models/adress")
const User = require("../models/user")

const updateAdderess = async(req,res)=>{
    const {name,address1,address2,city,country,pincode,phone,userId} = req.body
   
    try{
        
        const result = await Address.create({
            name:name,
            adress1:address1,
            address2:address2,
            city:city,
            country:country,
            pincode:pincode,
            phone:phone
        })
        await User.findByIdAndUpdate(userId,{address:result._id},{new:true})
      
        res.status(200).json({address: result });
    }catch(err){
        res.json({message:"Error occured"})
        console.log(err)
    }
}

const getAddress = async(req,res)=>{
    const {userId} = req.body
 
    try{
        const address = await User.findById(userId).populate("address")
        res.status(200).json(address)
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    updateAdderess,
    getAddress
}