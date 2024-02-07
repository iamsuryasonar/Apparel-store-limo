import CategoryCard from "../components/CategoryCard";
import Subscribe from "../components/Subscribe";
import InstagramWrapper from "../components/InstagramWrapper";
import { useState, useEffect, useRef } from 'react';
import './HomePage.css'
import { useSelector } from 'react-redux'
import BottomAlert from '../components/BottomAlert'

function HomePage() {

    const bannerRef = useRef(null);
    const productRef = useRef(null);
    const subscribeRef = useRef(null);
    const instagramWrapperRef = useRef(null);
    const message = useSelector((state) => state.message.message);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry?.target?.id === 'banner-section' && entry.isIntersecting === true) {
                        bannerRef.current.classList.add('slide-in')
                    }
                    if (entry?.target?.id === 'product-section' && entry.isIntersecting === true) {
                        productRef.current.classList.add('slide-in')
                    }
                    if (entry?.target?.id === 'instagram-section' && entry.isIntersecting === true) {
                        instagramWrapperRef.current.classList.add('slide-in')
                    }
                })
            },
            { rootMargin: "-150px", }
        );
        observer.observe(bannerRef.current);
        observer.observe(productRef.current);
        observer.observe(instagramWrapperRef.current);
        return () => observer.disconnect();
    }, []);


    return (
        <main className="max-w-7xl flex flex-col items-center w-full h-full">
            <div ref={bannerRef} id="banner-section" className="w-full h-full">
                <img className='h-[20rem] w-full object-cover' src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div ref={productRef} id="product-section" className="w-11/12 mt-36 flex flex-col justify-center gap-8 lg:grid lg:grid-cols-4 ">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
            <div className="w-full">
                <img className="w-full mt-36 h-[28rem] object-cover" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                <img className="w-full h-[22rem] object-cover" src='https://plus.unsplash.com/premium_photo-1674921631244-66e47b989131?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <InstagramWrapper instagramWrapperRef={instagramWrapperRef} />
            <Subscribe />
            {message && <BottomAlert message={message} />}
        </main>
    )
}

export default HomePage; 