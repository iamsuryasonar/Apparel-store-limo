
import { useState } from 'react';
import useOnScreen from '../../../hooks/useOnScreen'

function BannerSection() {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });
    const [bannerImageLoaded, setBannerImageLoaded] = useState(false);

    return <section ref={ref} className={`w-full h-[320px] transition-all duration-700 ${isVisible ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        {
            !bannerImageLoaded && <div className='absolute w-full h-full aspect-[700/320] bg-slate-300 animate-pulse'>
            </div>
        }
        <img alt='banner' onLoad={() => setBannerImageLoaded(true)} className='h-[20rem] w-full object-cover' src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
    </section>
}

export default BannerSection