import { useEffect, useState } from 'react';
import ProductsService from '../../../services/products.services'
import ProductCarousel from '../../../components/ProductCarousel'
import ProductCard from '.././../../components/ProductCard'

function NewArrivedProducts({ categories }) {
    const [newArrivedProducts, setNewArrivedproducts] = useState(null)

    const getNewlyArrivedProducts = async () => {
        const res = await ProductsService.getProductsByTag('New arrival')
        setNewArrivedproducts(res);
    }

    useEffect(() => {
        getNewlyArrivedProducts();
    }, [])

    return <>
        {
            categories &&
            <div className='bg-slate-50 w-full min-h-[400px] p-10 flex flex-col items-center justify-center gap-4'>
                <p className="self-start text-3xl font-bold ">New Arrivals</p>
                <div className='w-9/12 h-full p-2 flex flex-col md:hidden'>
                    {newArrivedProducts &&
                        <ProductCarousel products={newArrivedProducts} />
                    }
                </div>
                <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
                    {newArrivedProducts && newArrivedProducts?.map((product, index) => {
                        return <ProductCard key={index} product={product} index={index} arr={newArrivedProducts} />
                    })}
                </div>
            </div>
        }
    </>
}


export default NewArrivedProducts