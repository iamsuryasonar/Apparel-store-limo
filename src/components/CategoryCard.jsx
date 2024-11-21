import { Link } from 'react-router-dom'
import { useState } from 'react'

function CategoryCard({ category }) {

    const [loadedImages, setLoadedImages] = useState(false);

    const handleImageLoad = () => {
        setLoadedImages(!loadedImages);
    };

    return (
        <li>
            <Link to={`/products/category/${category?._id}`} state={category} className="aspect-[1/1] w-full h-full hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full relative rounded-full overflow-hidden">
                    <div className={`h-full w-full bg-slate-200 animate-pulse ${loadedImages ? 'hidden' : 'block'}`}></div>
                    <img alt='banner' className='h-full w-full ' src={category?.bannerImage?.url} onLoad={() => handleImageLoad()} />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0000008a] via-[#0000006b] to-transparent'></div>
                    {loadedImages && <div className="absolute inset-0 place-self-center">
                        <p className="uppercase text-white text- sm:text-lg font-light">{category?.name}</p>
                    </div>}
                </div >
            </Link >
        </li>
    )
}

export default CategoryCard;