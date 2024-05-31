import { useState } from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../../../assets/banner.jpg'

function BannerSection() {
    const [bannerImageLoaded, setBannerImageLoaded] = useState(false);

    return <section className={`relative w-full h-[320px] transition-all duration-700 `}>
        {
            !bannerImageLoaded && <div className='absolute w-full h-full bg-slate-300 animate-pulse'>
            </div>
        }
        {/* <img alt='banner' onLoad={() => setBannerImageLoaded(true)} className='h-[20rem] w-full object-cover' src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' /> */}
        <img alt='banner' src={bannerImage} onLoad={() => setBannerImageLoaded(true)} className='h-[20rem] w-full object-cover' />
        <Link to='/shop' className='absolute bottom-6 right-6 bg-white px-4 py-1 rounded-md font-bold'>Shop Now</Link>
    </section>
}

export default BannerSection