import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
    const[name,setName] = useState()
    const[email,setEmail] = useState()
    const[password,setPassword] = useState()
    const[cnfPassowrd,setCnfPassowrd] = useState()
    const { setShowSignUp } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);
      if (!email || !cnfPassowrd || !password || !name) {
        return toast.error("All fields are required");
      }

      if (password !== cnfPassowrd) {
        return toast.error("Password and Confirm Password do not match");
      }

      try {
        const result = await axiosInstance.post("/user/signup", {
          name,
          email,
          password,
        });

        localStorage.setItem("uid", JSON.stringify(result.data.user));

        toast.success(result.data.message || "Signup successful!");

        setLoading(false);
        setShowSignUp(false);
      } catch (err) {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message || "Signup failed");
        } else {
          toast.error("An error occurred. Please try again.");
        }
        setLoading(false);
      }
    };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-md w-full">
        <div className="w-full px-8 pt-6 pb-6">
          <p className="text-lg text-gray-600 text-center font-bold">
            Create New Account
          </p>

          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-amber-50 hover:text-black text-xl"
            onClick={() => setShowSignUp(false)}
          >
            ✕
          </button>

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
              <label className="block font-bold mb-2">Email Address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                onChange={(e) => setCnfPassowrd(e.target.value)}
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
                  <span class="loading loading-ring loading-xl"></span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp
