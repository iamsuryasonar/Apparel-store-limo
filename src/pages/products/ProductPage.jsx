import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import ProductsService from "../../services/products.services";
import { addToCart } from "../../store/slices/cartSlice";
import ImageCarousel from "../../components/ImageCarousel";
import useLocalStorageLimited from '../../hooks/useLocalStorageLimited';
import { LOCAL_STORAGE_RECENTLY_VIEWED } from '../../utilities/constants'
import ProductCard from '../../components/ProductCard'
import useScrollToTop from '../../hooks/useScrollToTop'

/* page to display single product information */
function ProductPage() {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch()

    let { state } = useLocation();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [selectedColorVariantIndex, setSelectedColorVariantIndex] =
        useState(0);
    const [selectedSizeVariantIndex, setSelectedSizeVariantIndex] =
        useState(0);

    const [recentlyViewed, setRecentlyViewed] = useLocalStorageLimited(LOCAL_STORAGE_RECENTLY_VIEWED, 4);

    const getAProduct = async () => {
        const response = await ProductsService.getProduct(state?.productId);
        setProduct(response?.product)
    }

    useEffect(() => {
        getAProduct();
    }, [state]);

    useEffect(() => {
        const currentColorVariantIndex = product?.colorvariants?.reduce((acc, curr, index) => {
            return curr._id === state.colorVariantId ? index : acc;
        }, 0);

        setSelectedColorVariantIndex(currentColorVariantIndex);
    }, [product]);

    useEffect(() => {
        const currentSizeVariantIndex = product?.colorvariants[selectedColorVariantIndex].sizevariants?.reduce((acc, curr, index) => {
            return curr._id === state.sizeVariantId ? index : acc;
        }, 0);

        setSelectedSizeVariantIndex(currentSizeVariantIndex);
    }, [selectedColorVariantIndex]);

    useEffect(() => {
        if (product && selectedColorVariantIndex && selectedSizeVariantIndex) {
            setRecentlyViewed({
                _id: product?._id,
                name: product.name,
                tag: product.tag,
                category: product.category,
                image: product?.colorvariants[selectedColorVariantIndex]?.images[0],
                colorvariants: product?.colorvariants[selectedColorVariantIndex],
                sizevariants: product?.colorvariants[selectedColorVariantIndex].sizevariants[selectedSizeVariantIndex],
            })
        }

    }, [product, selectedColorVariantIndex, selectedSizeVariantIndex])

    const addToCartHandler = () => {
        dispatch(addToCart({
            quantity,
            productId: product?._id,
            colorVariantId: product?.colorvariants[selectedColorVariantIndex]._id,
            sizeVariantId: product?.colorvariants[selectedColorVariantIndex].sizevariants[selectedSizeVariantIndex]._id,
        }))
    }

    useScrollToTop()

    return (<div className="max-w-7xl w-full flex ">
        {product && <div className="flex flex-col gap-6">
            <div className='w-full h-min grid grid-cols-1 md:grid-cols-2 my-4'>
                <div className="p-4 w-full h-min relative">
                    {product.tag && <div className='z-10 absolute top-10 left-10 -rotate-45 -translate-x-1/2 -translate-y-1/2 bg-teal-400 px-1 py-1'>
                        <p className='text-white text-sm font-light'>{product.tag}</p>
                    </div>}
                    {product.colorvariants[selectedColorVariantIndex]?.images && <ImageCarousel images={product.colorvariants[selectedColorVariantIndex]?.images} />}
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <div className='flex flex-col'>
                        <p className="py-1 rounded-sm w-full font-bold text-xl">{product.name}</p>
                        <p className='text-slate-400 font-light text-sm'>{product.category?.name}</p>
                    </div>
                    <div className='flex flex-col text-lg font-bold' >
                        <div className='flex flex-row gap-1'>
                            <p className='line-through'>₹{product.colorvariants[selectedColorVariantIndex]?.sizevariants[selectedSizeVariantIndex]?.mrp}</p>
                            <p>₹{product.colorvariants[selectedColorVariantIndex]?.sizevariants[selectedSizeVariantIndex]?.selling_price}</p>
                            <p className='text-green-500 text-sm'>{Math.round(100 * (product.colorvariants[selectedColorVariantIndex]?.sizevariants[selectedSizeVariantIndex]?.mrp - product?.colorvariants[selectedColorVariantIndex]?.sizevariants[selectedSizeVariantIndex]?.selling_price) / product?.colorvariants[selectedColorVariantIndex]?.sizevariants[selectedSizeVariantIndex]?.mrp)}% Off</p>
                        </div>
                        <p className='text-slate-500 font-light text-sm'>Inclusive of All Taxes + Free Shipping</p>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <p > GENDER: <span className='text-slate-500'>{product?.gender}</span> </p>

                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <p > COLOR: <span className='text-slate-500'>{product.colorvariants[selectedColorVariantIndex]?.name}</span> </p>
                        <div className='flex flex-row gap-4'>
                            {product.colorvariants?.map((item, index, arr) => {
                                return <img alt='color thumbnail' key={item._id} onClick={() => { setSelectedColorVariantIndex(index); }} className={`w-10 h-10 rounded-full ${selectedColorVariantIndex === index ? ` border-2 border-green-500` : `border-2 border-slate-300`}`} src={arr[index]?.thumbnail.url}></img>
                            })}
                        </div>
                    </div>
                    <div>SELECT SIZE</div>
                    <div className="w-full flex flex-row gap-2 font-light ">
                        {
                            product.colorvariants[selectedColorVariantIndex]?.sizevariants?.map((size, index, arr) => {
                                return <div key={size._id} className={`w-10 h-10 border-black border grid place-content-center ${selectedSizeVariantIndex === index ? 'bg-black text-white' : 'bg-white text-black '}`}
                                    onClick={() => {
                                        setSelectedSizeVariantIndex(index)
                                    }}
                                >
                                    <p className='text-lg font-light'>{size.name}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <label>QTY:</label>
                        <select name="Quantity" id="" onChange={(e) => setQuantity(e.target.value)} className='px-2 py-2 cursor-pointer border-[1px] bg-white border-black'>
                            <option disabled value="Select...">Select...</option>
                            {['1', '2', '3', '4', '5'].map((i) => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            user ?
                                addToCartHandler()
                                :
                                navigate('/sign-in', {//take id of whatever user was viewing and vavigate to that page after log in
                                    state: { ...state, type: 'ADD_TO_CART' },
                                })
                        }}
                        className="py-2 px-4 font-bold text-white bg-black rounded-lg border border-black hover:bg-white hover:text-black">
                        ADD TO CART
                    </button>
                </div>
                <div className="p-4 w-full">
                    <p className="p-1  text-md ">{product.description}</p>
                    <p className="p-1 text-sm text-slate-500">{product.keyword}</p>
                </div>
            </div>
            <div>
                <p className="font-light text-3xl px-4 uppercase ">Recently viewed</p>
                <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center px-4 md:px-8 gap-4`}>
                    {recentlyViewed.length > 0 && recentlyViewed?.map((product, index) => {
                        return <ProductCard key={index} product={product} index={index} arr={recentlyViewed} />
                    })}
                </div>
            </div>
        </div>
        }
    </div>
    );
}
export default ProductPage;
