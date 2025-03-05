import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import  {Routes, Route,BrowserRouter } from "react-router-dom"
import AllProducts from '../pages/AllProducts'
import Banner from '../components/Banner'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'
import SignUp from '../pages/SignUp'
import AddToCart from '../pages/AddToCart'
import AdminPage from '../pages/AdminPage'
import CheckOut from '../pages/CheckOut'
import Login from '../pages/Login'
import OrderSuccess from '../components/OrderSuccess'
import Orders from '../pages/Orders'
function App() {
  const {user,setShowLogIn} = useAuth()
  return (
    <div >
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<AddToCart/>}/>
        <Route path='/admin' element={user ? <AdminPage/>: <Login/> }/>
        <Route path='/checkout' element={user ? <CheckOut/> : <Login/> }/>
        <Route path='/myorders' element={user ? <Orders/> : <Login/> }/>
      </Routes>
      
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App
