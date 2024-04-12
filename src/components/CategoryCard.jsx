import { Link } from 'react-router-dom'
import { useState } from 'react'

function CategoryCard({ category }) {

    const [loadedImages, setLoadedImages] = useState(false);

    const handleImageLoad = () => {
        setLoadedImages(!loadedImages);
    };

    return (
        <div className='w-full sm-w-[240px] flex justify-center'>
            <div className="relative rounded-md shadow-lg overflow-hidden">
                {/* {
                    !loadedImages && <div className='absolute w-full h-full aspect-[400/550] bg-slate-300 animate-pulse'>
                    </div>
                } */}
                <img alt='banner' src={category?.bannerImage?.url} onLoad={() => handleImageLoad()} />
                {loadedImages && <div className="absolute left-4 bottom-4">
                    <h1 className="text-2xl py-2 uppercase text-white sm:text-3xl">{category?.name}</h1>
                    <Link to={`/products/category/${category?._id}`} state={category} className="p-2 font-light text-center text-lg shadow-lg bg-white hover:bg-black hover:text-white rounded-lg">SHOP NOW</Link>
                </div>}
            </div >
        </div>
    )
}

export default CategoryCard;