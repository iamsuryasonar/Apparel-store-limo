import { Link } from 'react-router-dom'
import { useState } from 'react'

function CategoryCard({ category }) {

    const [loadedImages, setLoadedImages] = useState(false);

    const handleImageLoad = () => {
        setLoadedImages(!loadedImages);
    };

    return (
        <li className='w-full h-full'>
            <Link to={`/products/category/${category?._id}`} state={category} className="w-full h-full">
                <div className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full h-full relative overflow-hidden">
                    <div className={`h-full w-full bg-slate-200 animate-pulse ${loadedImages ? 'hidden' : 'block'}`}></div>
                    <img alt='banner' className='h-full w-full ' src={category?.bannerImage?.url} onLoad={() => handleImageLoad()} />
                </div >
            </Link >
        </li>
    )
}

export default CategoryCard;