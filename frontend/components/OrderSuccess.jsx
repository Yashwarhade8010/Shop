import { React, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

const OrderSuccess = () => {
  const {myOrders,quantities,user ,address,myOrdersTotal,setConfirm} = useAuth();
  const printRef = useRef();
  

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML; // Step 2: Get inner content
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent; // Step 3: Replace body with selected div
    window.print(); // Step 4: Trigger print
    document.body.innerHTML = originalContent; // Step 5: Restore page
    window.location.reload(); // Step 6: Reload to avoid losing state
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-y-auto max-h-[80vh] w-full sm:w-auto max-w-[90vw] mx-auto p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-600 flex items-center justify-center gap-2">
            <i className="fas fa-check-circle"></i> Thanks for your Order
          </h2>
        </div>

        <div ref={printRef} className="mt-5">
          <h5 className="font-semibold">
            Order No: <span className="font-normal">265454011</span>
          </h5>
          <p className="text-sm">
            We've sent a confirmation email to <strong>{user?.email}</strong>
          </p>

          <h5 className="mt-4 font-semibold">Order Details</h5>
          <p className="flex items-center gap-2">
            <i className="fas fa-shipping-fast"></i> Home Shipping
          </p>
          {address ? (
            <p>
              Shipping to: {address?.address1}, {address?.city},{" "}
              {address?.country} {address?.pincode}
            </p>
          ) : (
            <p className="text-red-500">Address not found.</p>
          )}
          <p>Arrives in: 3-4 Business Days</p>

          {myOrders?.slice(-quantities).map((product) => (
            <div
              key={product?._id}
              className="flex items-center gap-4 border p-2 rounded-lg mt-2"
            >
              <img
                alt="Product"
                className="w-12 h-12"
                src={product?.thumbnail}
              />
              <div>
                <p className="font-semibold">{product?.name}</p>
                <p>Part # APP5325</p>
                <p>
                  <a className="text-blue-500 underline">
                    5 YR REPLACEMENT IF DEFECTIVE
                  </a>
                </p>
                <p>Qty: 1</p>
                <p className="font-bold">₹{product?.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
          <div className="mt-5">
            <h5 className="font-semibold">Order Summary</h5>
            <p>Subtotal ({myOrders?.length || 0} Items)</p>
            <h5 className="font-bold">
              Order Total{" "}
              <span className="float-right">
                ₹{myOrdersTotal?.toLocaleString() || 0}
              </span>
            </h5>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <button className="btn btn-outline-dark w-full" onClick={handlePrint}>
            Print Order Details
          </button>
          <button className="btn btn-outline-dark w-full">
            Go to My Order History
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="btn bg-red-500 text-white w-full"
          >
            Close
          </button>
        </div>

        <div className="text-center mt-4 text-sm">
          <i className="fas fa-phone-alt"></i>
          <span className="ml-2">1 (877) 238-2623</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
