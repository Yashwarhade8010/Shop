import { createContext, useContext, useState, useEffect } from "react";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import OrderSuccess from "../components/OrderSuccess";
import Loading from "../components/Loading";
import { axiosInstance } from "../lib/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogIn, setShowLogIn] = useState(false);
    const[loggedIn,setLoggedIn] = useState(false)
    const [products,setProducts] = useState([])
    const [atcproducts,setAtcProducts] = useState([])
    const [cartTotal,setCartTotal] = useState(0)
    const [confirm,setConfirm] = useState(false)
    const [loading,setLoading] =useState(false)
    const [quantities,setQuantities] = useState(0)
    const [checkOut,setCheckOut] = useState(false)
    const [address,setAddress] = useState([])
    const [myOrders,setMyOrders] =useState([])
    const [myOrdersTotal,setMyOrdersTotal] =useState(0)
    
    useEffect(() => {
        const storedUser = localStorage.getItem("uid");
        const getAtcProducts = JSON.parse(localStorage.getItem("cart")) || []
        const cartTotalPrice = JSON.parse(localStorage.getItem("cartTotal"))||0
        const quantity = JSON.parse(localStorage.getItem("cartQuantity"))
        setAtcProducts(getAtcProducts)
        setCartTotal(cartTotalPrice)
        setQuantities(quantity)
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser); // Parse safely
                setUser(parsedUser ); // Avoid error
                setLoggedIn(true)
                async function prevOrders(){
                    const preOrders = await axiosInstance.post("/user/getorders",{userId:parsedUser._id})
                    setMyOrders(preOrders.data)
                } 
                prevOrders()
            } catch (error) {
                console.error("Error parsing stored user:", error);
            }
        }
        
    }, []);

    
    const logout = () => {
        localStorage.removeItem("uid");
        setUser(null);
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, showSignUp, setShowSignUp,showLogIn, setShowLogIn,loggedIn,setLoggedIn,logout,products,setProducts,atcproducts,setAtcProducts,cartTotal,setCartTotal,confirm,setConfirm,loading,setLoading,quantities,setQuantities,checkOut,setCheckOut,address,setAddress,myOrders,setMyOrders,myOrdersTotal,setMyOrdersTotal}}>
            {children}
            {showSignUp && <SignUp/>}
            {showLogIn && <Login/>}
            {confirm && <OrderSuccess/>}
            {loading && <Loading/>}
        </AuthContext.Provider>
    );
};

// Custom hook for easy context access
export const useAuth = () => useContext(AuthContext);