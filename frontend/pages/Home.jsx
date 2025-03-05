import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const Home = () => {
  const products = ["Electronics", "Furniture", "Fashion", "Jewellery"];
  const [product, setProduct] = useState();
  
  let i = 0;
  useEffect(() => {
   
    const interval = setInterval(() => {
      if (i == products.length) {
        i = 0;
      }
      setProduct(products[i]);
      i = i + 1;
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center h-[80vh] ">
  <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-5xl gap-6 px-6">
    {/* Left Side (Text) */}
    <div className="max-w-sm md:max-w-lg text-center md:text-left">
      <p className="text-3xl md:text-4xl text-amber-50 font-bold mb-3">
        Best place to choose your <span className="text-emerald-600">{product}</span>
      </p>
      <p className="text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        odit quis molestiae! Excepturi quidem consequuntur adipisci earum
        error. Animi vero quos sequi magni, atque neque laborum voluptate
        illum asperiores temporibus.
      </p>
      <button className="btn btn-success text-amber-50 text-lg mt-4 mx-auto md:mx-0">
        <Link to={'/products'}>SHOP NOW</Link>
      </button>
    </div>

    {/* Right Side (Image) */}
    <div className="flex justify-center items-center">
          <img
            className="w-full max-w-[300px] md:max-w-[500px] lg:max-w-[600px]"
            src="../utilities/Catalogue-pana.svg"
            alt="Catalogue"
          />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
