import React from 'react'
import Banner from '../components/Banner'
import AtcPoductCard from '../components/AtcPoductCard'
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
const AddToCart = () => {
  const {atcproducts,user} = useAuth();
  
  
  return (
    <div>
      <Banner name={"Cart"} />
      <div className='w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-6 flex flex-col h-full'>
      <h1 className='text-3xl font-semibold mb-4'>Shopping Cart</h1>
      <div className='flex flex-col xl:flex-row justify-between gap-y-10 gap-x-5'>
        <div className='overflow-x-auto w-full flex-1'>
            <table className='table table-zebra w-full'>
                <thead>
                    <tr className='grid grid-cols-3 gap-6'>
                        <th className='text-sm md:text-lg text-left'>
                            ITEM
                        </th>
                        <th className='text-sm md:text-lg text-center'>
                            PRICE
                        </th>
                        <th className='text-sm md:text-lg text-right'>
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                            {atcproducts.map((product)=>{
                                return (<td key={product._id} className='flex gap-x-2'>
                                 <AtcPoductCard product={product}/>
                                </td>)
                            })}
                        
                    </tr>
                </tbody>
            </table>
            {atcproducts.length>0 ? 
            (<div className="flex justify-center mt-5">
            <Link to={"/checkout"} className="btn btn-wide btn-outline btn-success text-lg">
              Check Out
            </Link>
          </div>):
          (<div className="flex flex-col justify-center items-center mt-15">
          <h3 className="text-3xl font-bold mb-4">Cart is empty...</h3>
          <Link to={"/products"} className="btn btn-outline btn-success text-lg ">Shop</Link>
        </div>)}
        </div>
      </div>
      </div>
    </div>
  )
}

export default AddToCart
