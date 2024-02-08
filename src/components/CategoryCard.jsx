import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
    return (
        <div className='flex justify-center'>
            <div className="relative ">
                <img src={category?.bannerImage?.url} />
                <div className="absolute left-4 bottom-4">
                    <h1 className="text-2xl uppercase text-white sm:text-3xl">{category?.name}</h1>
                    <Link to={`/products/${category?._id}`} state={category} className="p-2 font-light text-center text-lg bg-white hover:bg-black hover:text-white">SHOP NOW</Link>
                </div>
            </div >
        </div>
    )
}

export default CategoryCard;