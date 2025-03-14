import React from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Card = ({ product }) => {
  const { setAtcProducts, setCartTotal } = useAuth();

  const AddProduct = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTotalPrice = JSON.parse(localStorage.getItem("cartTotal")) || 0;
    const existingProduct = cart.find((item) => item._id === product._id);

    if (!existingProduct) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAtcProducts(cart);
      const newTotal = cartTotalPrice + product.price;
      setCartTotal(newTotal);
      localStorage.setItem("cartTotal", JSON.stringify(newTotal));

      toast.success(`${product.name} added to cart`, {
        position: "top-right",
      });
    } else {
      toast("Product already in cart");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <figure className="px-5 pt-5">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="rounded-xl w-full h-auto"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-emerald-600 text-lg sm:text-xl">
          {product.name}
        </h2>
        <p className="text-sm sm:text-base">{product.description}</p>
        <h3 className="card-title text-lg sm:text-xl">
          ₹{product.price.toLocaleString()}
        </h3>
        <div className="card-actions w-full flex justify-center mt-2">
          <button
            onClick={AddProduct}
            className="btn btn-primary w-full sm:w-auto"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
