import { Link } from 'react-router-dom'
import { useState } from 'react'

function CategoryCard({ category }) {

    const [loadedImages, setLoadedImages] = useState(false);

    const handleImageLoad = () => {
        setLoadedImages(!loadedImages);
    };

    return (
        <>
            <Link to={`/products/category/${category?._id}`} state={category} className="aspect-[171/228] w-full h-full hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full relative rounded-md shadow-lg overflow-hidden">
                    <div className={`h-full w-full bg-slate-200 animate-pulse ${loadedImages ? 'hidden' : 'block'}`}></div>
                    <img alt='banner' className='h-full w-full' src={category?.bannerImage?.url} onLoad={() => handleImageLoad()} />
                    {loadedImages && <div className="absolute left-2 bottom-1">
                        <p className="uppercase text-white text-lg font-semibold">{category?.name}</p>
                    </div>}
                </div >
            </Link >
        </>
    )
}

export default CategoryCard;