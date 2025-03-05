import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CheckoutBilling from "../components/CheckoutBilling";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

CheckoutBilling;
const CheckOut = () => {
  const [showPayment, setShowPayment] = useState(false);
  const { atcproducts, cartTotal,setCheckOut } = useAuth();
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(atcproducts.length > 0){
      setCheckOut(true)
    }
    
    if(atcproducts.length == 0){
      navigate("/cart")
      toast("Cart is empty")
    }
  },[])

  return (
    <div>
      <Banner name={"Checkout"} />
      <div className="w-full mx-auto p-4 lg:p-10 lg:w-9/12 md:px-6 flex flex-col h-full">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <CheckoutBilling showPayment={setShowPayment} />
          <div className="w-full md:w-2/5 h-max p-4 bg-base-100 rounded-md shadow-xl">
            <h1 className="text-3xl font-light">Checkout Summary</h1>
            <div className="mt-2">
              <p className="text-sm font-light text-gray-500">
                Cart Item(s): {atcproducts.length}
              </p>
              <div className="flex items-center justify-between ">
                <h1 className="text-xl font-light">Subtotal: </h1>
                <p className="text-success text-xl font-semibold">
                  ₹{cartTotal.toLocaleString()}
                </p>
              </div>
              <div>
              {atcproducts.map((product) => {
                return (
                  <div key={product._id} className="border-2 border-success-content rounded-md my-2 p-2">
                    <h1 className="text-lg md:text-2xl text-success">
                      {product.name}
                    </h1>
                   
                    <p>Unit Price : ₹{product.price.toLocaleString()}</p>
                
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
