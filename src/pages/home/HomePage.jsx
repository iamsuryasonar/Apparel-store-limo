import './HomePage.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCreditCard, faRankingStar, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import CategoryCard from "../../components/CategoryCard";
import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import BottomAlert from '../../components/BottomAlert'
import { get_categories } from '../../store/slices/categorySlice'
import ProductsService from '../../services/products.services';
import ProductCard from '../../components/ProductCard';
import ProductCarousel from '../../components/ProductCarousel';

function HomePage() {
    const dispatch = useDispatch();
    const bannerRef = useRef(null);
    const productRef = useRef(null);
    const instagramWrapperRef = useRef(null);
    const message = useSelector((state) => state.message.message);
    const categories = useSelector((state) => state.categories.categories);
    const [newArrivedProducts, setNewArrivedproducts] = useState(null)
    const [bannerImageLoaded, setBannerImageLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry?.target?.id === 'banner-section' && entry.isIntersecting === true) {
                        bannerRef.current.classList.add('slide-in')
                    }
                    if (entry?.target?.id === 'product-section' && entry.isIntersecting === true) {
                        setTimeout(() => {
                            productRef.current.classList.add('slide-in')
                        }, 500)
                    }
                    if (entry?.target?.id === 'instagram-section' && entry.isIntersecting === true) {
                        instagramWrapperRef.current.classList.add('slide-in')
                    }
                })
            },
            { rootMargin: "-10px", }
        );
        observer.observe(bannerRef.current);
        observer.observe(productRef.current);
        observer.observe(instagramWrapperRef.current);
        return () => observer.disconnect();
    }, []);

    const getNewlyArrivedProducts = async () => {
        const res = await ProductsService.getProductsByTag('New arrival')
        setNewArrivedproducts(res);
    }

    useEffect(() => {
        dispatch(get_categories());
        getNewlyArrivedProducts();
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <main className="max-w-7xl min-h-svh flex flex-col gap-8 items-center w-full h-full">
            <div ref={bannerRef} id="banner-section" className="w-full h-[320px]">
                {
                    !bannerImageLoaded && <div className='absolute w-full h-full aspect-[700/320] bg-slate-300 animate-pulse'>
                    </div>
                }
                <img onLoad={() => setBannerImageLoaded(true)} className='h-[20rem] w-full object-cover' src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>

            <div ref={productRef} id="product-section" className="w-11/12 gap-8 grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3  lg:grid lg:grid-cols-4 justify-center">
                {categories && categories?.map((category) => {
                    return <CategoryCard key={category._id} category={category} />
                })}
            </div>
            {bannerImageLoaded &&
                <>
                    <div className='bg-slate-100 w-full min-h-[400px] p-10 flex flex-col items-center justify-center gap-4'>
                        <p className="self-start text-3xl font-bold ">New Arrivals</p>
                        <div className='w-9/12 h-full p-2 flex flex-col md:hidden'>
                            {newArrivedProducts &&
                                <ProductCarousel products={newArrivedProducts} />
                            }
                        </div>
                        <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
                            {newArrivedProducts && newArrivedProducts?.map((product, index) => {
                                return <ProductCard key={index} product={product} index={index} arr={newArrivedProducts} />
                            })}
                        </div>
                    </div>
                </>
            }

            <InstagramWrapper instagramWrapperRef={instagramWrapperRef} />

            <Subscribe />

            <ServicesSection />

            <HelpAndInformationSection />

            <FollowUsSection />

            {message && <BottomAlert message={message} />}
        </main>
    )
}

export default HomePage;



function ServicesSection() {
    return <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-start">
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faRankingStar} />
            <div className="flex flex-col">
                <p className="font-semibold">Quatity</p>
                <p>100% Original quality guaranteed</p>
            </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faCartShopping} />
            <div className="flex flex-col">
                <p className="font-semibold">7 Days Replacement</p>
                <p>On all orders*</p>
            </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faCreditCard} />
            <div className="flex flex-col">
                <p className="font-semibold">Secure Payments</p>
                <p>Visa, Mastercard, EMI, Net Banking, UPI, BHIM, Wallet's </p>
            </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faTruckFast} />
            <div className="flex flex-col">
                <p className="font-semibold">Fast & Free Shipping</p>
                <p>Ships in 24 Hours*</p>
            </div>
        </div>
    </div>
}

function HelpAndInformationSection() {
    return <div className="w-full p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full  flex flex-col">
            <p className="font-bold">NEED HELP?</p>
            <Link className='hover:text-blue-400' to='/account'>Your Account</Link>
            <Link className='hover:text-blue-400' to='/contact-us'>Contact Us</Link>
            <Link className='hover:text-blue-400'>Returns, Refunds & Cancellations</Link>
        </div>
        <div className="w-full flex flex-col">
            <p className="font-bold">INFORMATION</p>
            <Link to='/terms-and-conditions' className='hover:text-blue-400'>Terms & Conditions</Link>
            <Link className='hover:text-blue-400'>Privacy Policy</Link>
        </div>
    </div>
}

function FollowUsSection() {
    return <div className="w-full p-4 md:p-6 flex flex-col justify-start gap-2">
        <p className="font-bold">Follow Us</p>
        <div className="flex flex-row gap-2">
            <div className="group w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                <FontAwesomeIcon className="text-xl group-hover:text-blue-700" icon="fab fa-linkedin" />
            </div>
            <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                <FontAwesomeIcon className="text-xl group-hover:text-red-500" icon="fab fa-instagram" />
            </div>
            <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                <FontAwesomeIcon className="text-xl group-hover:text-blue-600" icon="fab fa-facebook" />
                {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
            </div>
            <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                <FontAwesomeIcon className="text-xl group-hover:text-red-500" icon="fab fa-youtube" />
            </div>
        </div>
    </div>
}