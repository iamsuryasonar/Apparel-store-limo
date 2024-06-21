import { Link } from 'react-router-dom';
import bannerImage from '../../../assets/banner.jpg'

function BannerSection() {

    return <section className={`relative w-full h-full bg-slate-100 transition-all duration-700`}>
        <div className='absolute inset-0 bg-gradient-to-b from-slate-100 to-transparent'></div>
        <div className='relative h-[400px]'>
            <img alt='banner' src={bannerImage} className='h-full w-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-b from-[#0000007a] via-[#00000021] to-slate-50'></div>
        </div>
        <div className='px-4 absolute bottom-[170px]'>
            <p className='mb-4 font-bold text-6xl text-white'>Discover timeless trends... </p>
            <Link to='/shop' className='text-xl text-black bg-white hover:bg-black hover:text-white transition-colors duration-500 px-4 py-2 rounded-md font-normal'>Shop Now</Link>
        </div>

    </section>
}

export default BannerSection