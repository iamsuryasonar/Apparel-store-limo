import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setShowSearch } from '../store/slices/searchSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from "../store/slices/cartSlice";
import useOnScreen from '../hooks/useOnScreen'
import LazyLoadImage from '../components/LazyLoadImage';
import { padSentence } from '../utilities/utility'

function ProductCard({ product, animate }) {
    const user = useSelector((state) => state.auth.userData);
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { state } = useLocation();

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

    function handleCardClicked(e) {
        navigate(`/product/${product?._id}`, {
            state: { colorVariantId: product?.colorvariants?._id, sizeVariantId: product?.sizevariants?._id, productId: product._id }
        })
            /* if search modal is enabled, this will disable that */nm
        dispatch(setShowSearch(false));
    }

    return <div tabIndex={0}
        ref={ref}
        className={`group  m-2 place-self-center hover:-translate-y-2 hover:shadow-md overflow-hidden relative flex flex-col cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-1 translate-y-0' : animate ? 'opacity-0 translate-y-[100px]' : 'opacity-1'}`}
        onClick={handleCardClicked}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.click();
            }
        }}>
        <LazyLoadImage className='aspect-[10/12] object-cover w-full h-full' src={product?.image?.url} alt='product' onLoad={() =>
            handleImageLoad(product?.image?._id)
        } />

        <div className={`absolute w-full h-full aspect-[10/12] animate-pulse bg-slate-300 ${loadedImages.includes(product?.image?._id) ? 'hidden' : 'block'}`}></div>
        {
            loadedImages.includes(product?.image?._id)
                ? <div className='absolute top-1 left-1 sm:top-1 sm:left-1 rounded-sm bg-white px-[3px] py-[1px]'>
                    <p className='text-black text-xs'>{Math.round(100 * (product?.sizevariants.mrp - product?.sizevariants.selling_price) / product?.sizevariants.mrp)}% Off</p>
                </div>
                : <></>
        }
        <div className="p-1">
            <span className="text-gray-400 uppercase text-xs">{product?.category?.name}</span>
            <p className="text-black block text-sm truncate">{padSentence(product?.name, 3)}</p>
            <div className="flex items-center">
                <div className='flex flex-col items-start'>
                    <div className='flex items-center'>
                        <p className="text-xs font-normal text-black cursor-auto">₹{product?.sizevariants.selling_price}</p>
                        <del>
                            <p className="text-xs font-light text-gray-600 cursor-auto ml-2">₹{product?.sizevariants.mrp}</p>
                        </del>
                    </div>
                    <p className='text-green-600 font-light text-xs'>{product?.tag}</p>
                </div>
                <div className="m-1 ml-auto text-black bg-transparent text-lg sm:text-2xl  hover:scale-110 transition-all duration-500 ">
                    <FontAwesomeIcon className='' icon={faCartPlus}
                        onClick={(e) => {
                            e.stopPropagation();
                            user ?
                                addToCartHandler()
                                :
                                navigate('/sign-in', {// take id of whatever user was viewing and navigate to that page after log in
                                    state: { ...state, type: 'ADD_TO_CART' },
                                })
                        }} />
                </div>
            </div>
        </div>
    </div>
}

export default ProductCard;
