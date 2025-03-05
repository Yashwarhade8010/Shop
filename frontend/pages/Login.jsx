import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

const Login = () => {
  
    const[email,setEmail] = useState()
    const[password,setPassword] = useState()
    
    const { setShowLogIn,setLoggedIn,setUser } = useAuth();

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      if (!email ||!password ) {
          return toast.error("All fields are required");
      }
  
      
  
      try {
     
        const result = await axiosInstance.post("/user/signin", { email, password });
        localStorage.setItem("uid", JSON.stringify(result.data.user));
        
        setUser(result.data.user);
        setLoggedIn(true);
        toast.success(result.data.message || "Login successful!");
        setShowLogIn(false);
        
          
          
      } catch (err) {
          
          if (err.response && err.response.data) {
              toast.error(err.response.data.message || "Login failed");
          } else {
              toast.error("An error occurred. Please try again.");
          }
      }
  };
  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-md w-full">
                <div className="w-full px-8 pt-6 pb-6">
                    <p className="text-lg text-gray-600 text-center font-bold">Login</p>
                    
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-6 text-amber-50 hover:text-black text-xl"
                        onClick={() => setShowLogIn(false)}
                    >
                        ✕
                    </button>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                       

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

                       

                        <div className="flex flex-col items-center mt-4">
                            <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded-md">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login
