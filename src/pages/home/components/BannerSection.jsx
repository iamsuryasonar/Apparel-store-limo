import { Link } from 'react-router-dom';
import bannerImage from '../../../assets/banner.jpg'

function BannerSection() {

    return <section className={`relative w-full h-full bg-slate-100 transition-all duration-700`}>
        <div className='absolute inset-0 bg-gradient-to-b from-slate-100 to-transparent'></div>
        <div className='relative h-[400px]'>
            <img alt='banner' src={bannerImage} className='h-full w-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-slate-50'></div>
        </div>
        <div className='px-6 absolute bottom-[150px]'>
            <p className='font-bold text-6xl text-white'>Discover timeless trends...</p>
        </div>
        <Link to='/shop' className='absolute bottom-[150px] right-6 bg-white hover:bg-black hover:text-white transition-colors duration-500 px-4 py-1 rounded-md font-bold'>Shop Now</Link>
    </section>
}

export default BannerSection