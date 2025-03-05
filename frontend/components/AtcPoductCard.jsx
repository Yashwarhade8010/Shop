import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


const AtcPoductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { setCartTotal,setAtcProducts,atcproducts,cartTotal,} = useAuth();
  const price = product.price;



  const totalPrice = price ;


  const handleRemoveItem = ()=>{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = cart.filter((item)=>item._id != product._id)
    localStorage.setItem("cart", JSON.stringify(newCart));
    let newProducts = atcproducts.filter((item)=>item._id != product._id)
    setAtcProducts(newProducts)
    let newTotal = cartTotal-totalPrice
    setCartTotal(newTotal)
    localStorage.setItem("cartTotal", JSON.stringify(newTotal));
   
  }

  
  return (
    <div className="p-4 r rounded-lg flex items-center justify-between w-full ">
      {/* Product Details */}
      <div className="flex items-center gap-4">
        <img
          src={product.thumbnail}
          alt="product"
          className="w-20 h-20 object-cover"
        />
        <div className="max-w-2xs">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">₹{price.toLocaleString()}.00</p>
          {/* Quantity Selector */}
          {/* <div className="flex items-center mt-2">
            <span className="font-semibold mr-2">Qty:</span>

            <div className="flex items-center border rounded-lg px-2">
              <button
                className="px-3 py-1 text-lg border-r hover:bg-gray-200"
                onClick={handleSubstractQuant }
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 text-lg border-l hover:bg-gray-200"
                onClick={handleAddQuantity}
              >
                +
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Total Price & Delete Icon */}
      <div className="flex items-center gap-4 text-center">
        <p className="text-green-600 text-lg font-semibold">
          ₹{totalPrice.toLocaleString()}
        </p>
      </div>

      {/* Right Section (Trash Button) */}
      <div className="text-right">
        <button className="text-red-500 hover:text-red-700 text-lg" onClick={handleRemoveItem}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default AtcPoductCard;
