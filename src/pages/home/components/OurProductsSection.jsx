import React, { useEffect, useState } from 'react';
import ProductsService from '../../../services/products.services'
import ProductCard from '../../../components/ProductCard'
import { Link } from 'react-router-dom'

function OurProductsSection() {
    const [currentTab, setCurrentTab] = useState(1)
    const [newArrived, setNewArrived] = useState(null)
    const [mostPurchased, setMostPurchased] = useState(null)
    const [popular, setPopular] = useState(null);

    const tabs = [
        {
            id: 1,
            label: 'Popular',
            component: <PopularProducts popular={popular} />
        },
        {
            id: 2,
            label: 'New arrival',
            component: <NewArrivedProducts newArrived={newArrived} />
        },
        {
            id: 3,
            label: 'Most purchased',
            component: <MostPurchasedProducts mostPurchased={mostPurchased} />
        },
    ]

    const getNewlyArrivedProducts = async () => {
        const res = await ProductsService.getProductsByTag({
            tag: 'New arrival'
        })
        setNewArrived(res.products);
    }

    const getMostPurchasedProducts = async () => {
        const res = await ProductsService.getProductsByTag({
            tag: 'Most purchased'
        })
        setMostPurchased(res.products);
    }

    const getpopularProducts = async () => {
        const res = await ProductsService.getProductsByTag({
            tag: 'Popular',
        })
        setPopular(res.products);
    }

    useEffect(() => {
        getNewlyArrivedProducts();
        getMostPurchasedProducts();
        getpopularProducts();
    }, [])

    return <div className='w-full my-6 flex flex-col justify-center items-center gap-4'>
        <p className='font-light text-4xl'>Our Products</p>
        <div className='py-4 flex flex-col sm:flex-row gap-4'>
            {tabs && tabs.map((item, index) => {
                return <div key={item.id} className={`px-6 py-2 capitalize cursor-pointer rounded-lg border border-black ${currentTab === index ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={() => {
                        setCurrentTab(index)
                    }}
                >{item.label}</div>
            })}
        </div>
        {tabs[currentTab].component}
        <Link to={`/products/tag/${tabs[currentTab].label}`} state={{ name: tabs[currentTab].label }} className="px-6 py-2 cursor-pointer rounded-lg bg-white text-black border border-black hover:bg-black hover:text-white">Load More</Link>
    </div>
}

export default OurProductsSection;

function NewArrivedProducts({ newArrived }) {
    return <>
        <div className='bg-slate-50 w-full min-h-[400px] px-6 flex flex-col items-center justify-center gap-4'>
            {newArrived && newArrived.length > 0 && <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center gap-4`}>
                {newArrived?.slice(0, 4)?.map((product, index) => {
                    return <ProductCard key={index} product={product} index={index} arr={newArrived} />
                })}
            </div>}
            {newArrived && newArrived.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
    </>
}

function MostPurchasedProducts({ mostPurchased }) {
    return <>
        <div className='bg-slate-50 w-full min-h-[400px] px-6 flex flex-col items-center justify-center gap-4'>
            {mostPurchased && mostPurchased.length > 0 && <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center gap-4`}>
                {mostPurchased?.slice(0, 4)?.map((product, index) => {
                    return <ProductCard key={index} product={product} index={index} arr={mostPurchased} />
                })}
            </div>}
            {mostPurchased && mostPurchased.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
    </>
}

function PopularProducts({ popular }) {
    return <>
        <div className='bg-slate-50 w-full min-h-[400px] px-6 flex flex-col items-center justify-center gap-4'>
            {popular && popular.length > 0 && <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center gap-4`}>
                {popular?.slice(0, 4)?.map((product, index) => {
                    return <ProductCard key={index} product={product} index={index} arr={popular} />
                })}
            </div>}
            {popular && popular.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
    </>
}