import React, { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const AdminPage = () => {
  const [name, setName] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [price, setPrice] = useState();
  const [description, SetDescription] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async () => {
    setLoading(true);
    if (!name || !thumbnail || !price || !description) {
      return toast(
        <div
          class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
          role="alert"
          tabindex="-1"
          aria-labelledby="hs-toast-warning-example-label"
        >
          <div class="flex p-4">
            <div class="shrink-0">
              <svg
                class="shrink-0 size-4 text-yellow-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
              </svg>
            </div>
            <div class="ms-3">
              <p
                id="hs-toast-warning-example-label"
                class="text-sm text-gray-700 dark:text-neutral-400"
              >
                All fields Required
              </p>
            </div>
          </div>
        </div>
      );
    }
    try {
      const result = await axiosInstance.post("product/addproduct", {
        name,
        thumbnail,
        price,
        description,
        category,
      });
      toast.success(result.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-md w-full">
        <div className="w-full px-8 pt-6 pb-6">
          <p className="text-lg text-gray-600 text-center font-bold">
            Add Product
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Thumbnail Url</label>
              <input
                type="text"
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Price</label>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Category</label>
              <select className="select w-full border-gray-200 p-2 rounded-md bg-white" onChange={(e) => setCategory(e.target.value)}>
                <option disabled selected  >
                  Pick Category
                </option>
                <option>Electronic</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Jwellery</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">Description</label>
              <textarea
                type="text"
                onChange={(e) => SetDescription(e.target.value)}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col items-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white w-full p-2 rounded-md"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  <span>ADD</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
