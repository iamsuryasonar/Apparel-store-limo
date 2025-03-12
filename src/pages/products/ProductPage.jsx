import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import ProductsServices from "../../services/products.services";
import { addToCart } from "../../store/slices/cartSlice";
import ImageCarousel from "../../components/ImageCarousel";
import useLocalStorageLimited from '../../hooks/useLocalStorageLimited';
import { LOCAL_STORAGE_RECENTLY_VIEWED } from '../../utilities/constants'
import ProductCard from '../../components/ProductCard'
import { setLoading } from "../../store/slices/loadingSlice";
import ReviewForm from "../../components/ReviewForm";
import StarRating from "../../components/StarRating";
import ReviewServices from "../../services/review.services";

/* page to display single product information */
function ProductPage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.userData);

    let { state } = useLocation();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [selectedColorVariantIndex, setSelectedColorVariantIndex] = useState(0);
    const [selectedSizeVariantIndex, setSelectedSizeVariantIndex] = useState(0);
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);
    const [showEditReviewForm, setShowEditReviewForm] = useState(false);
    const [selectedReview, setSelectedReview] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewPageNo, setReviewPageNo] = useState(1);

    const [recentlyViewed, setRecentlyViewed] = useLocalStorageLimited(LOCAL_STORAGE_RECENTLY_VIEWED, 4);

    const getProductAndReview = async () => {
        dispatch(setLoading(true));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const productResponse = await ProductsServices.getProduct(state?.productId);
        setProduct(productResponse?.product);

        const reviewResponse = await ReviewServices.getReview({ page: 1, productId: state?.productId });
        setReviews(reviewResponse);

        dispatch(setLoading(false));
    }

    const addToCartHandler = () => {
        dispatch(addToCart({
            quantity,
            productId: product?._id,
            colorVariantId: product?.colorvariants[selectedColorVariantIndex]._id,
            sizeVariantId: product?.colorvariants[selectedColorVariantIndex].sizevariants[selectedSizeVariantIndex]._id,
        }))
    }

    async function reloadReviewCallback() {
        setReviewPageNo(1);
        setShowEditReviewForm(false);
        setShowAddReviewForm(false);
        const reviewResponse = await ReviewServices.getReview({ page: 1, productId: state?.productId });
        setReviews(reviewResponse);
    }

    async function handleReviewPagination(type) {
        if (type === "PREV" && reviewPageNo === 1) return;
        if (type === "NEXT" && reviews.pagination?.page_no === reviews.pagination?.total_pages) return;

        if (type === "PREV") {
            setReviewPageNo(prev => prev - 1);
            const reviewResponse = await ReviewServices.getReview({ page: reviewPageNo - 1, productId: state?.productId });
            setReviews(reviewResponse);
        }

        if (type === "NEXT") {
            setReviewPageNo(prev => prev + 1);
            const reviewResponse = await ReviewServices.getReview({ page: reviewPageNo + 1, productId: state?.productId });
            setReviews(reviewResponse);
        }
    }

    useEffect(() => {
        getProductAndReview();
    }, [state]);

    useEffect(() => {
        if (product && state) {
            /* sets initial color variant index received from state */
            const currentColorVariantIndex = product.colorvariants?.reduce((acc, curr, index) => {
                return curr._id === state.colorVariantId ? index : acc;
            }, 0);

            /* sets initial size variant index received from state */
            const currentSizeVariantIndex = product.colorvariants[currentColorVariantIndex]?.sizevariants?.reduce((acc, curr, index) => {
                return curr._id === state.sizeVariantId ? index : acc;
            }, 0);

            setSelectedColorVariantIndex(currentColorVariantIndex);
            setSelectedSizeVariantIndex(currentSizeVariantIndex);

            /* updated recently viewed product since new product is viewed*/
            setRecentlyViewed({
                _id: product._id,
                name: product.name,
                tag: product.tag,
                category: product.category,
                image: product.colorvariants[selectedColorVariantIndex]?.images[0],
                colorvariants: product.colorvariants[selectedColorVariantIndex],
                sizevariants: product.colorvariants[selectedColorVariantIndex]?.sizevariants[selectedSizeVariantIndex],
            })
        }
    }, [product, state]);

    return (<div className="max-w-6xl w-full flex ">
        {product && <div className="flex flex-col ">
            <div className='w-full h-min grid grid-cols-1 md:grid-cols-2 mt-4'>
                <div className="p-4 max-w-[400px] w-full h-min relative">
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
            <div className="flex flex-col gap-0">
                <p className="font-light text-2xl px-4 uppercase ">Recently viewed</p>
                <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center p-4 md:p-8 gap-4`}>
                    {recentlyViewed.length > 0 && recentlyViewed?.map((product, index) => {
                        return <ProductCard key={index} product={product} index={index} arr={recentlyViewed} animate={true} />
                    })}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="px-4 flex justify-between items-center gap-1">
                    <p className="font-light text-2xl uppercase">Reviews</p>
                    {
                        user && user?._id && <button onClick={() => setShowAddReviewForm(true)} className="py-0 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#78B3CE] transition-colors duration-300 bg-opacity-70 backdrop-blur-md">Add review</button>
                    }
                </div>
                <div className="m-4 px-4 py-2 flex justify-between bg-slate-50">
                    <p><span>Total reviews: </span>{product?.reviewCount}</p>
                    <p><span>Total ratings: </span>{product?.totalRating} stars</p>
                </div>
                <div className={`w-full px-4 flex flex-col gap-4`}>
                    {
                        reviews?.reviews?.length > 0 ? reviews?.reviews?.map((review, index) => {
                            return <div key={review._id} className="px-4 py-2 bg-slate-100 text-black">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold">{review.reviewer_name}</p>
                                    {
                                        (user && review.customer === user?._id) && <button onClick={() => { setShowEditReviewForm(true); setSelectedReview(index) }} className="py-0 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#78B3CE] transition-colors duration-300 bg-opacity-70 backdrop-blur-md">edit</button>}
                                </div>
                                <StarRating type={'SHOW'} rating={review.rating} total={5} iconSize={25} />
                                {review?.message && <p className="">{review.message}</p>}
                            </div>
                        }) : <p className="text-lg">No reviews yet!</p>
                    }
                    {(reviews?.reviews?.length > 0) && <div className="flex gap-2 items-center place-self-end">
                        <button disabled={reviews.pagination?.page_no === 1} onClick={() => handleReviewPagination('PREV')} className="px-2 py-1 border-[1px] border-black text-black hover:bg-black hover:text-white disabled:border-slate-500 disabled:text-slate-700 disabled:hover:text-slate-200 disabled:hover:bg-slate-600 cursor-pointer">prev</button>
                        <p>{reviewPageNo}</p>
                        <button disabled={reviews.pagination?.page_no === reviews.pagination?.total_pages} onClick={() => handleReviewPagination('NEXT')} className="px-2 py-1 border-[1px] border-black text-black hover:bg-black hover:text-white disabled:border-slate-500 disabled:text-slate-700 disabled:hover:text-slate-200 disabled:hover:bg-slate-600 cursor-pointer">next</button>
                    </div>}
                </div>
            </div>
        </div>
        }
        {showAddReviewForm && <ReviewForm type="ADD" productId={product?._id} setShowReviewForm={setShowAddReviewForm} reloadReviewCallback={reloadReviewCallback} />}
        {showEditReviewForm && <ReviewForm type="EDIT" review={reviews?.reviews[selectedReview]} productId={product?._id} setShowReviewForm={setShowEditReviewForm} reloadReviewCallback={reloadReviewCallback} />}
    </div >
    );
}
export default ProductPage;

