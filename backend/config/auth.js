const {sign} = require("jsonwebtoken")
require("dotenv").config()

const gentrateToken = (user)=>{
    return sign({
        name:user.name,
        email:user.email
    },process.env.SECRET)
}

module.exports = {
    gentrateToken
}