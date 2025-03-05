import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
const Card = ({ product }) => {
  const { setAtcProducts,setCartTotal,} = useAuth();
  
  const AddProduct = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTotalPrice = JSON.parse(localStorage.getItem("cartTotal"))
    const existingProduct = cart.find((item) => item._id == product._id);

    if (!existingProduct) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAtcProducts(cart);
      const newTotal = cartTotalPrice + product.price;
      setCartTotal(newTotal);
      localStorage.setItem("cartTotal", JSON.stringify(newTotal));

      toast(
        <div role="alert" className="alert alert-success ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{product.name} added to cart</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    } else {
      toast("Product already in cart");
    }
  };

  return (
    <div className="card bg-base-100 w-70 shadow-xl ">
      <figure className="px-10 pt-10">
        <img src={product.thumbnail} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-emerald-600">{product.name}</h2>
        <p>{product.description}</p>
        <h3 className="card-title">₹{product.price.toLocaleString()}</h3>
        <div className="card-actions justify-center">
          <button onClick={AddProduct} className="btn btn-primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
