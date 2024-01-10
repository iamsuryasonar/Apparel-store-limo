import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons'

function Cart({ setToggleCart }) {

    const [cartData, setCartData] = useState([])
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count++);
    }
    const decrement = () => {
        if (count > 0) setCount(count--);
    }

    let totalPrice = 1200;

    return (
        <div className='flex flex-col justify-center bg-slate-100 p-6'>
            <div className="flex flex-col gap-4 w-full h-screen">
                <div className="font-mono font-bold text-xl">
                    <div className='flex justify-between items-center'>
                        <h1 className="">CART</h1>
                        <FontAwesomeIcon onClick={() => setToggleCart(false)} className='text-4xl' icon={faXmark} />
                    </div>
                    <div className='h-[1px] bg-black w-full'></div>
                </div>
                {cartData.length === 0 ?
                    (
                        <div className="flex flex-col mt-20 justify-center items-center">
                            <p>Your cart is empty</p>
                        </div>
                    )
                    :
                    (
                        cartData?.map((item) => {
                            return (
                                <div className='flex flex-row'>
                                    <img className='w-40 h-40' src={item.image}></img>
                                    <div className='flex flex-col gap-2'>
                                        <p>{item.name}</p>
                                        <p>Rs. {item.price}</p>
                                        <div className='flex gap-2 border-[1px] border-black'>
                                            <p onClick={decrement}>-</p>
                                            <p>{count}</p>
                                            <p onClick={increment}>+</p>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            )
                        })
                    )
                }
                <div className='w-full absolute bottom-0 right-0 p-4'>
                    <div className='w-full h-[1px] bg-black'></div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row justify-between'>
                            <p>SUBTOTAL</p>
                            <p>Rs. {totalPrice}</p>
                        </div>
                        <p>Shipping, taxes and discount codes are calculated at check-out</p>
                        <button className='w-full py-2 bg-black text-white font-thin'>Check Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;