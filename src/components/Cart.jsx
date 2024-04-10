import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Transition } from 'react-transition-group';
import { updateItemQuantity, remove_item_from_cart } from '../store/slices/cartSlice'

function Cart(props) {
    const { show, toggleCart } = props;

    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.cart);

    const totalPrice = useMemo(() => {
        return cartItems?.reduce((acc, item) => {
            return acc + item?.sizevariant?.selling_price * item?.quantity;
        }, 0);
    }, [cartItems]);

    return (
        <Transition in={show} timeout={100}>
            {(state) => (
                <div className={`z-50 fixed inset-0 md:left-1/2 xl:left-2/3 bg-slate-100 px-4 py-6 transition-transform transform ease-in-out duration-700 ${state === 'entered' ? 'translate-x-0 ' : 'translate-x-full '}`}>
                    <div className="flex flex-col gap-4 w-full h-full">
                        <div className="font-mono font-bold text-xl">
                            <div className='flex justify-between items-center'>
                                <h1 className="">CART</h1>
                                <div className='group w-10 h-10 hover:bg-slate-200 grid place-items-center'>
                                    <FontAwesomeIcon onClick={() =>
                                        toggleCart()
                                    } className='text-4xl group-hover:text-blue-500' icon={faXmark} />
                                </div>
                            </div>
                            <div className='h-[1px] bg-black w-full'></div>
                        </div>
                        <div className='h-full flex flex-col gap-4 overflow-auto scrollbar overscroll-none p-2'>
                            {cartItems?.length === 0 ?
                                (
                                    <div className="flex flex-col mt-20 justify-center items-center">
                                        <p>Your cart is empty</p>
                                    </div>
                                )
                                :
                                (
                                    cartItems?.map((item) => {
                                        return <CartItem key={item._id} product={item} toggleCart={toggleCart} />
                                    })
                                )
                            }
                        </div>
                        <div className='w-full h-auto relative bottom-0 right-0 bg-slate-100'>
                            <div className='w-full h-[1px] bg-black'></div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row justify-between'>
                                    <p>SUBTOTAL</p>
                                    <p>Rs. {totalPrice}</p>
                                </div>
                                {cartItems?.length > 0 && <>
                                    <p>Shipping, taxes and discount codes are calculated at check-out</p>
                                    <button onClick={() => {
                                        toggleCart()
                                        navigate('/check-out', { state: cartItems })
                                    }} className='w-full py-2 bg-black text-white font-thin'>Check Out</button>
                                </>}
                            </div>
                        </div>
                    </div>
                </div >
            )
            }
        </Transition >
    )
}

export default React.memo(Cart);

const CartItem = (props) => {
    const { product, toggleCart } = props

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [countMap, setCountMap] = useState(new Map());

    const countHandler = (itemId, itemCount, type) => {
        let currentCount = countMap?.get(itemId);

        if (!currentCount) {
            if (type === 'INCREMENT' && itemCount >= 5) return;
            if (type === 'DECREMENT' && itemCount <= 1) return;
        } else {
            if (type === 'INCREMENT' && currentCount >= 5) return;
            if (type === 'DECREMENT' && currentCount <= 1) return;
        }

        if (countMap?.has(itemId)) {
            if (type === 'DECREMENT') {
                setCountMap(prev => {
                    const updatedMap = new Map(prev);
                    updatedMap.set(itemId, currentCount - 1);
                    return updatedMap;
                })
            }

            if (type === 'INCREMENT') {
                setCountMap(prev => {
                    const updatedMap = new Map(prev);
                    updatedMap.set(itemId, currentCount + 1);
                    return updatedMap;
                })
            }
        } else {
            if (type === 'DECREMENT') {
                setCountMap(prev => {
                    const updatedMap = new Map(prev);
                    updatedMap.set(itemId, itemCount - 1);
                    return updatedMap;
                })
            }

            if (type === 'INCREMENT') {
                setCountMap(prev => {
                    const updatedMap = new Map(prev);
                    updatedMap.set(itemId, itemCount + 1);
                    return updatedMap;
                })
            }
        }
    }

    const removeItemFromCart = (item) => {
        dispatch(remove_item_from_cart({ itemId: item?._id }));
    }

    const updateItemQuantityHandler = (quantity, itemId) => {
        dispatch(updateItemQuantity({
            quantity,
            itemId
        })).then(() => {
            setCountMap(prev => {
                const updatedMap = new Map(prev);
                updatedMap.delete(itemId);
                return updatedMap;
            });
        })
    }

    return <div className='relative flex flex-row justify-between m-1 p-2 gap-2 shadow-md bg-white rounded-md'
        onClick={
            () => {
                navigate(`/product/${product?.product?._id}`, {
                    state: { colorVariantId: product?.colorvariant?.id, sizeVariantId: product?.sizevariant?._id, productId: product?.product?._id }
                })
                toggleCart()
            }}>
        <img alt='product' className='w-40 aspect-square' src={product?.colorvariant.images[0].url}></img>
        <div className='flex flex-col gap-2 pb-2 pt-4 pr-4'>
            <p>{product?.product?.name}</p>
            <p>size: {product?.sizevariant?.name}</p>
            <p className='place-self-end'>Rs. {product?.sizevariant?.selling_price}</p>
            <div className=' place-self-end gap-2 border-[1px] border-black flex items-center'>
                <p className='text-xl font-bold px-1 cursor-pointer hover:bg-black hover:text-white'
                    onClick={(e) => {
                        e.stopPropagation()
                        countHandler(product._id, product?.quantity, 'DECREMENT')
                    }}>-</p>
                <p className='px-1 cursor-pointer'>{countMap?.has(product?._id) ? countMap?.get(product?._id) : product?.quantity}</p>
                <p className='text-lg font-bold px-1 cursor-pointer hover:bg-black hover:text-white'
                    onClick={(e) => {
                        e.stopPropagation()
                        countHandler(product._id, product?.quantity, 'INCREMENT')
                    }}>+</p>
            </div>
            {countMap?.has(product?._id) && <div onClick={(e) => {
                e.stopPropagation()
                updateItemQuantityHandler(countMap?.get(product?._id), product?._id)
            }} className='w-full px-2 py-1 bg-black text-white flex justify-center cursor-pointer'><p>Update</p></div>}
        </div>
        <div onClick={(e) => {
            e.stopPropagation()
            removeItemFromCart(product)
        }} className='absolute top-1 right-1 w-6 aspect-square bg-black  text-white  hover:bg-slate-900 hover:text-red-600  rounded-full flex justify-center items-center' >
            <FontAwesomeIcon icon={faXmark} />
        </div>
    </div>
}