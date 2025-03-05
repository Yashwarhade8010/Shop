const {loadAllProducts, addProduct, getProduct} = require("../controllers/productControllers")
const {Router} = require("express")

const router = Router()

router.get("/",loadAllProducts)
router.post("/addproduct",addProduct)
router.get("/getproduct",getProduct)

module.exports = router