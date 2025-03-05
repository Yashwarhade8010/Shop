import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "../pages/SignUp";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showSignUp, setShowSignUp, user ,setShowLogIn,showLogIn,loggedIn,logout,atcproducts,cartTotal} = useAuth();
  //const totalPrice = atcproducts.reduce((sum, p) => sum + p.price, 0).toLocaleString();
  
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Left Side - Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl">Shop</a>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex flex-1 justify-center space-x-6 text-lg">
        <li>
          <Link to="/" className="hover:text-emerald-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-emerald-600">
            All Products
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-emerald-600">
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          className="flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-base-100 shadow-md flex flex-col items-center space-y-4 py-4 z-10">
          <li>
            <Link to="/" className="text-lg" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-lg"
              onClick={() => setMenuOpen(false)}
            >
              All Products
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      )}

      {/* Right Side - Search, Cart, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar (Hidden on Small Screens) */}

        {/* Cart */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{atcproducts.length}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{atcproducts.length} Items</span>
              <span className="text-info">Subtotal: ₹{cartTotal.toLocaleString()}</span>
              <div className="card-actions">
                <Link className="btn btn-primary btn-block" to={"/cart"}>View cart</Link>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {loggedIn &&
            <li className="bg-emerald-600  text-gray-200 rounded-t-lg">
            <p className="block">Welcome <span className="font-bold">{user?.name}</span></p>
          </li>}
            <li>
              <Link to={"/myorders"} className="justify-between ">
                Orders 
              </Link>
            </li>

            <li>
              {loggedIn ? (
                <a
                  className="justify-between font-bold"
                  onClick={logout}
                >
                  Logout
                </a>
              ) : (
                <>
                  <a
                    className="justify-between"
                    onClick={() => {
                      if(showLogIn){
                        setShowLogIn(false)
                      }
                      setShowSignUp(!showSignUp)}
                    }
                  >
                    Signup
                  </a>
                  <a
                    className="justify-between"
                    onClick={() => {
                      if(showSignUp){
                        setShowSignUp(false)
                      }
                      setShowLogIn(!showLogIn)}
                    }
                  >
                    Login
                  </a>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
