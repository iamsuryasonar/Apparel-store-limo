import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setShowSearch } from '../store/slices/searchSlice';

function ProductCard({ product, index, arr }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loadedImages, setLoadedImages] = useState([]);

    const handleImageLoad = (index) => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };

    return <div key={index} className={`${(arr.length - 3 === index) ? 'scroll-container' : ''} w-full h-fit flex flex-col  border border-slate-200 cursor-pointer group`}
        onClick={() => {
            navigate(`/product/${product?._id}`, {
                state: { colorVariantId: product?.colorVariants?._id, sizeVariantId: product?.sizeVariants?._id, productId: product._id }
            })
            //if search modal is enabled this will disable that
            dispatch(setShowSearch(false));
        }}>
        {
            loadedImages.includes(product?.image?._id) ? <></> : <div className='w-full aspect-square flex flex-col justify-center items-center'>
                <div className='w-12 h-12 bg-transparent rounded-full border-black animate-spin border-8 border-dashed border-t-transparent'></div>
            </div>
        }
        < div className='relative' >
            <img className='object-cover w-full h-full' src={product?.image?.url} onLoad={() => handleImageLoad(product?.image?._id)} />
            {
                loadedImages.includes(product?.image?._id) ? <div className='absolute top-2 left-0 sm:top-2 sm:left-0 bg-teal-400 px-[4px] py-[1px] rounded-e-sm'>
                    <p className='text-white text-xs'>{Math.round(100 * (product?.sizeVariants.mrp - product?.sizeVariants.selling_price) / product?.sizeVariants.mrp)}% Off</p>
                </div> : <></>
            }
        </div >
        <div className='flex flex-col justify-between w-full h-full bg-slate-50 text-black group-hover:bg-black group-hover:text-white p-2 '>
            <p className='text-sm font-semibold'>{product?.name}</p>
            <div>
                <p className='text-slate-400 font-light text-xs sm:text-sm'>{product?.category?.name}</p>
                <div className='flex flex-row gap-1 text-xs sm:text-sm'>
                    <p className=''>₹{product?.sizeVariants.selling_price}</p>
                    <div className='flex flex-row gap-1'>
                        <p className=' line-through text-slate-400'>₹{product?.sizeVariants.mrp} </p>
                        <p className='text-green-600 '>{product?.tag}</p>
                    </div>
                </div>
            </div>
        </div>
    </div >

}

export default ProductCard;
