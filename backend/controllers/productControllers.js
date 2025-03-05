const Product = require("../models/Product")

const loadAllProducts = async(req,res)=>{
    try{
        const allProducts = await Product.find()
        res.status(200).json(allProducts)
    }catch(err){
        console.log(err)
    }
}
const addProduct = async(req,res)=>{
    const {thumbnail,name,description,price,category} = req.body
    try{
        const results = await Product.findOne({name});
        console.log(results)
        if(results){
            return res.status(400).json({message:"product already existed"})
        }
        await Product.create({
            thumbnail,
            name,
            description,
            price,
            category
        })
        res.status(201).json({message:"Product added successfully"})
    }catch(err){
        console.log(err)
    }
}

const getProduct = async (req, res) => {
    try {
        const { search } = req.query; 
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" }; 
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
};
module.exports={
    loadAllProducts,
    addProduct,
    getProduct
}