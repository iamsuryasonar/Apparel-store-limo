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
                <div className="w-full h-full relative rounded-md shadow-lg overflow-hidden ">
                    <div className={`h-full w-full bg-slate-200 animate-pulse ${loadedImages ? 'hidden' : 'block'}`}></div>
                    <img alt='banner' className='h-full w-full ' src={category?.bannerImage?.url} onLoad={() => handleImageLoad()} />
                    <div className='absolute inset-0 bg-gradient-to-t from-teal-400 via-transparent to-transparent'></div>
                    {loadedImages && <div className="absolute left-3 bottom-2">
                        <p className="uppercase text-white text-lg font-normal">{category?.name}</p>
                    </div>}
                </div >
            </Link >
        </>
    )
}

export default CategoryCard;