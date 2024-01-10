import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'



function CartComponent() {
   
    return (
    <>
     <div className="flex flex-col gap-4 h-screen w-full relative">
        <div className="absolute font-mono font-bold text-3xl left-2">
            <h1 className="">CART</h1>
            <div className='h-[0.1rem] w-screen bg-black'></div>
            </div>
           
            <div className="flex flex-col mt-20 justify-center items-center">
            <p>Your cart is empty</p>
            </div>
     
     </div>
    </>
    )
}

export default CartComponent;