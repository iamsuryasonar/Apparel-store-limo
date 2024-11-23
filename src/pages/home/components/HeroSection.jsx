import { Link } from 'react-router-dom';
import heroImage from '../../../assets/heroImage.png'

function HeroSection() {
    return <section className='h-[550px] flex gap-2 relative'>
        <div className='absolute sm:relative inset-0 p-4 sm:inset-auto w-full h-full'>
            <div className='w-[90%] md:w-[70%] h-full relative m-auto'>
                <div className='absolute top-[70px] left-0 right-0 bottom-[100px] w-full border-[10px] border-[#78B3CE]'></div>
                <img className='absolute inset-0 w-full h-[500px] object-contain' src={heroImage}></img>
            </div>
        </div>
        <div className='absolute sm:relative inset-0 p-4 sm:inset-auto w-full flex flex-col gap-1 justify-center items-start'>
            <h1 className="text-5xl font-bold text-start bg-white ps-0 px-2 py-2 sm:p-0 bg-opacity-70 backdrop-blur-md">
                Find Your
            </h1>
            <h1 className="text-5xl font-bold text-start bg-white ps-0 px-2 py-2 sm:p-0 bg-opacity-70 backdrop-blur-md">
                <span className='text-[#78B3CE]'>Fashion</span> Here
            </h1>
            <p className='text-start text-slate-500 text-sm bg-white ps-0 px-2 py-2 sm:p-0 bg-opacity-70 backdrop-blur-md'>Discover the latest trends, timeless classics, and statement pieces tailored to elevate your wardrobe.</p>
            <div className='bg-white ps-0 px-3 py-3 bg-opacity-70 backdrop-blur-md'>
                <Link to={'/shop'} className='py-1 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#78B3CE] transition-colors duration-300 bg-opacity-70 backdrop-blur-md'>Shop now</Link>
            </div>
        </div>
    </section >
}

export default HeroSection;