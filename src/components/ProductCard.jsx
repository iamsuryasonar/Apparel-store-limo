import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setShowSearch } from '../store/slices/searchSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from "../store/slices/cartSlice";
import useOnScreen from '../hooks/useOnScreen'
import LazyLoadImage from '../components/LazyLoadImage';

function ProductCard({ product }) {
    const user = useSelector((state) => state.auth.userData);
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loadedImages, setLoadedImages] = useState([]);

    const handleImageLoad = (index) => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };

    const addToCartHandler = () => {
        dispatch(addToCart({
            quantity: 1,
            productId: product?._id,
            colorVariantId: product?.colorvariants._id,
            sizeVariantId: product?.sizevariants._id,
        }))
    }
    /* scroll-container class is just to observe the last 3rd product and load more products(for pagination) */
    return <div ref={ref} className={` shrink-0  group max-w-[240px] max-h-[390px] w-full h-full place-self-center rounded-md shadow-lg overflow-hidden relative flex flex-col cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}
        onClick={(e) => {
            navigate(`/product/${product?._id}`, {
                state: { colorVariantId: product?.colorvariants?._id, sizeVariantId: product?.sizevariants?._id, productId: product._id }
            })
            /* if search modal is enabled this will disable that */
            dispatch(setShowSearch(false));
        }}>
        {
            loadedImages.includes(product?.image?._id) ? <></> : <div className='absolute top-[50%] right-[50%] -translate-y-1/2 translate-x-1/2 aspect-square flex flex-col justify-center items-center'>
                <div className='w-8 h-8 bg-transparent rounded-full border-black animate-spin border-2 border-dashed border-t-transparent'></div>
            </div>
        }

        {/* <img alt='product' className='aspect-[10/12] object-cover w-full h-full' src={product?.image?.url} onLoad={() =>
            handleImageLoad(product?.image?._id)
        } /> */}
        <LazyLoadImage className='aspect-[10/12] object-cover w-full h-full' src={product?.image?.url} alt='product' onLoad={() =>
            handleImageLoad(product?.image?._id)
        } />
        {
            loadedImages.includes(product?.image?._id)
                ? <div className='absolute top-2 left-0 sm:top-2 sm:left-0 bg-teal-400 px-[4px] py-[1px] rounded-e-sm'>
                    <p className='text-white text-xs'>{Math.round(100 * (product?.sizevariants.mrp - product?.sizevariants.selling_price) / product?.sizevariants.mrp)}% Off</p>
                </div>
                : <></>
        }
        {
            loadedImages.includes(product?.image?._id) && <div className='relative flex flex-col justify-between w-full bg-white text-black group-hover:bg-slate-900 group-hover:text-white p-2 pt-4 '>
                <FontAwesomeIcon className='absolute -top-4 right-1 p-2 w-4 h-4 rounded-full group bg-yellow-300 hover:bg-orange-500  text-white shadow-xl' icon={faCartPlus}
                    onClick={(e) => {
                        e.stopPropagation();
                        user ?
                            addToCartHandler()
                            :
                            navigate('/sign-in', {//take id of whatever user was viewing and vavigate to that page after log in
                                state: { ...state, type: 'ADD_TO_CART' },
                            })
                    }} />
                <p className='text-sm font-semibold'>{product?.name}</p>
                <div>
                    <p className='text-white-400 font-light text-xs sm:text-sm'>{product?.category?.name}</p>
                    <div className='flex flex-row gap-1 text-xs sm:text-sm'>
                        <p className=''>₹{product?.sizevariants.selling_price}</p>
                        <div className='flex flex-row gap-1'>
                            <p className=' line-through text-slate-400'>₹{product?.sizevariants.mrp} </p>
                            <p className='text-green-600 '>{product?.tag}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div >
}

export default ProductCard;
