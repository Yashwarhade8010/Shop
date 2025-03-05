import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/Banner";

const Orders = () => {
  const { myOrders } = useAuth();
  
  return (
    <div>
      <Banner name={"MyOrders"} />
      <div className="w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-6 flex flex-col h-full">
        <h1 className="text-3xl font-semibold mb-4">Your Last Orders</h1>
        <div className="flex flex-col xl:flex-row justify-between gap-y-10 gap-x-5">
          <div className="overflow-x-auto w-full flex-1">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="grid grid-cols-3 gap-10 justify-between">
                  <th className="text-sm md:text-lg text-left">ITEM</th>
                  <th className="text-sm md:text-lg text-right">ORDERED ON</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {myOrders.map((product) => {
                    return (
                      <div className="p-4 r rounded-lg flex items-center justify-between w-full ">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.thumbnail}
                            alt="product"
                            className="w-20 h-20 object-cover"
                          />
                          <div className="max-w-2xs">
                            <h2 className="text-lg font-semibold">
                              {product.name}
                            </h2>
                            <p className="text-gray-600">
                              ₹{product.price.toLocaleString()}.00
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-center">
                          <p className="text-green-600 text-lg font-semibold">
                            {Date(product.updatedAt).slice(0,15)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
