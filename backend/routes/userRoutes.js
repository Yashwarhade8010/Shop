const {Router} = require("express")
const { handleSignup, handleSignin, addMyOrders, getMyOrders } = require("../controllers/userController")
const { updateAdderess, getAddress } = require("../controllers/addressController")
const router = Router()

router.post("/signup",handleSignup)
router.post("/signin",handleSignin)
router.post("/address",updateAdderess)
router.post("/getaddress",getAddress)
router.post("/addorders",addMyOrders)
router.post("/getorders",getMyOrders)

module.exports = router