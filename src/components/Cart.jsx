import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { get_all_cart_items, update_item_quantity, remove_item_from_cart } from '../store/slices/cartSlice'

function Cart({ setToggleCart }) {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cart?.cartItems);
    console.log(cartItems)
    const totalPrice = cartItems?.reduce((acc, item) => {
        return acc + item?.sizevariant?.selling_price * item?.quantity;
    }, 0);

    const incrementQuantity = (item) => {
        // 5 is the max quantity one can purchase
        if (item?.quantity < 6) {
            dispatch(update_item_quantity({ itemId: item?._id, type: 'INCREMENT', productId: item?.product?._id }))
        }
    }
    const decrementQuantity = (item) => {
        dispatch(update_item_quantity({ itemId: item?._id, type: 'DECREMENT', productId: item?.product?._id }))
    }

    const removeItemFromCart = (item) => {
        dispatch(remove_item_from_cart({ itemId: item?._id }));
    }

    useEffect(() => {
        dispatch(get_all_cart_items())
    }, [])

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
                {cartItems?.length === 0 ?
                    (
                        <div className="flex flex-col mt-20 justify-center items-center">
                            <p>Your cart is empty</p>
                        </div>
                    )
                    :
                    (
                        cartItems?.map((item) => {
                            return (
                                <div key={item._id} className='relative flex flex-row justify-between border border-black p-2 gap-2'>
                                    <img className='w-40 aspect-square' src={item?.colorvariant.images[0].url}></img>
                                    <div className='flex flex-col gap-2 py-2'>
                                        <p>{item?.product?.name}</p>
                                        <p className='place-self-end'>Rs. {item?.sizevariant?.selling_price}</p>
                                        <div className=' place-self-end gap-2 border-[1px] border-black flex items-center'>
                                            <p className='text-xl font-bold px-1 cursor-pointer hover:bg-black hover:text-white' onClick={() => decrementQuantity(item)}>-</p>
                                            <p className='p-1 cursor-pointer'>{item?.quantity}</p>
                                            <p className='text-lg font-bold px-1 cursor-pointer hover:bg-black hover:text-white' onClick={() => incrementQuantity(item)}>+</p>
                                        </div>
                                    </div>
                                    <div onClick={() => removeItemFromCart(item)} className='absolute top-0 right-0 w-6 aspect-square bg-slate-200  text-red-600 hover:bg-black hover:text-white  rounded-full flex justify-center items-center' >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
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
                        {cartItems?.length > 0 && <>
                            <p>Shipping, taxes and discount codes are calculated at check-out</p>
                            <button className='w-full py-2 bg-black text-white font-thin'>Check Out</button>
                        </>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart;