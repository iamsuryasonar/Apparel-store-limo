import React, { useEffect, useState } from 'react';
import ProductsService from '../../../services/products.services'
import ProductCard from '../../../components/ProductCard'

function OurProductsSection() {
    const [currentTab, setCurrentTab] = useState(1)
    const [newArrived, setNewArrived] = useState(null)
    const [mostPurchased, setMostPurchased] = useState(null)
    const [popular, setPopular] = useState(null);

    const tabs = [
        {
            id: 1,
            label: 'New Arrival',
            component: <NewArrivedProducts newArrived={newArrived} />
        },
        {
            id: 2,
            label: 'Featured',
            component: <MostPurchasedProducts mostPurchased={mostPurchased} />
        },
        {
            id: 3,
            label: 'Popular',
            component: <PopularProducts popular={popular} />
        },
    ]
    const getNewlyArrivedProducts = async () => {
        const res = await ProductsService.getProductsByTag('New arrival')
        setNewArrived(res);
    }

    const getMostPurchasedProducts = async () => {
        const res = await ProductsService.getProductsByTag('Most purchased')
        setMostPurchased(res);
    }

    const getpopularProducts = async () => {
        const res = await ProductsService.getProductsByTag('Popular')
        setPopular(res);
    }

    useEffect(() => {
        getNewlyArrivedProducts();
        getMostPurchasedProducts();
        getpopularProducts();
    }, [])

    return <div className='w-full my-6 flex flex-col justify-center items-center gap-4'>
        <p className='font-light text-4xl'>Our Products</p>
        <div className='py-4 flex flex-row gap-4'>
            {tabs && tabs.map((item, index) => {
                return <div key={item.id} className={`px-6 py-2 cursor-pointer rounded-lg border border-black ${currentTab === index ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={() => {
                        setCurrentTab(index)
                    }}
                >{item.label}</div>
            })}
        </div>
        {tabs[currentTab].component}
    </div>
}

export default OurProductsSection;

function NewArrivedProducts({ newArrived }) {
    return <>
        <div className='bg-slate-50 w-full min-h-[400px] px-6 flex flex-col items-center justify-center gap-4'>
            {newArrived.length > 0 && <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center gap-4`}>
                {newArrived?.map((product, index) => {
                    return <ProductCard key={index} product={product} index={index} arr={newArrived} />
                })}
            </div>}
            {newArrived.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
    </>
}

function MostPurchasedProducts({ mostPurchased }) {
    return <>
        <div className='bg-slate-50 w-full min-h-[400px] px-6 flex flex-col items-center justify-center gap-4'>
            {mostPurchased.length > 0 && <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center gap-4`}>
                {mostPurchased?.map((product, index) => {
                    return <ProductCard key={index} product={product} index={index} arr={mostPurchased} />
                })}
            </div>}
            {mostPurchased.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
    </>
}

function PopularProducts({ popular }) {
    return <>
        <div className='bg-slate-50 w-full min-h-[400px] px-6 flex flex-col items-center justify-center gap-4'>
            {popular.length > 0 && <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center gap-4`}>
                {popular?.map((product, index) => {
                    return <ProductCard key={index} product={product} index={index} arr={popular} />
                })}
            </div>}
            {popular.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
    </>
}