import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const CheckoutBilling = ({ showPayment }) => {
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const {setMyOrdersTotal, setConfirm, setLoading,setQuantities, user, setAddress,atcproducts ,setAtcProducts,setCartTotal,cartTotal,setMyOrders} = useAuth();
  
  const userId = user?._id; // Ensure user exists before accessing _id
  const navigate = useNavigate()
  const confirm = async () => {
    try {
        setLoading(true); 
        

        localStorage.setItem("cartQuantity", atcproducts.length);
        setQuantities(atcproducts.length);

  
        const result = await axiosInstance.post("/user/addorders", {
            userId,
            atcproducts
        });
        setMyOrders(atcproducts);
        setMyOrdersTotal(cartTotal);
        setConfirm(true);
        setAtcProducts([]);
        setCartTotal(0);
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTotal");
        localStorage.setItem("cartQuantity", 0); 
        navigate("/products");
    } catch (error) {
        console.error("Error confirming order:", error);
        alert("Something went wrong! Please try again.");
    } finally {
        setLoading(false); 
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address1 || !address2 || !city || !country || !pincode || !phone) {
      return toast.error("All fields are required!");
    }

    try {
      setLoading(true);
      
      await axiosInstance.post("/user/address", {
        name,
        address1,
        address2,
        city,
        country,
        pincode,
        phone,
        userId,
      });
      
      const result2 = await axiosInstance.post("/user/getaddress", { userId });

      if (result2.data?.address) {
        setAddress(result2.data.address[0]);
      }
      
      setTimeout(confirm, 2000);
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address.");
    }
  };

  return (
    <div className="flex-1 p-4 rounded-md shadow-lg">
      <h1 className="text-3xl font-light">Shipping Address</h1>
      <form className="form-control mt-2" onSubmit={handleSubmit}>
        <div className="mt-2">
          <label className="label-text mb-2 block text-lg">Recipient Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <div className="mt-2">
          <label className="label-text mb-2 block text-lg">Address Line 1:</label>
          <input
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <div className="mt-2">
          <label className="label-text mb-2 block text-lg">Address Line 2:</label>
          <input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <div className="mt-2">
          <label className="label-text mb-2 block text-lg">Country:</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <div className="mt-2">
          <label className="label-text mb-2 block text-lg">City:</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <div className="mt-2">
          <label className="label-text mb-2 block text-lg">Pin code:</label>
          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <div className="mt-2 mb-4">
          <label className="label-text mb-2 block text-lg">Phone:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-sm text-lg input-bordered max-w-md w-full"
            required
          />
        </div>
        <button className="btn btn-success max-w-sm w-full">
          PROCEED TO CHECKOUT
        </button>
      </form>
    </div>
  );
};

export default CheckoutBilling;