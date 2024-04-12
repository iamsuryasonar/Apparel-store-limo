import React, { useEffect, useState } from 'react';
import ProductsService from '../../../services/products.services'
import ProductCard from '../../../components/ProductCard'
import { Link } from 'react-router-dom'
import { setLoading } from '../../../store/slices/loadingSlice';
import { useDispatch } from 'react-redux'
import ComponentCarousel from '../../../components/ComponentCarousel';
import useWindowSize from '../../../hooks/useWindowSize'

function ProductsByTagsSection() {
    const dispatch = useDispatch();
    const [productByTag, setProductByTag] = useState({
        newArrived: [],
        mostPurchased: [],
        popular: [],
    })

    const getProductsByTag = async (tag) => {
        dispatch(setLoading(true))
        const res = await ProductsService.getProductsByTag({
            tag: tag,
        })
        if (tag === 'New arrival') {
            setProductByTag(prev => {
                return { ...prev, newArrived: res.products }
            });
        }
        if (tag === 'Most purchased') {
            setProductByTag(prev => {
                return { ...prev, mostPurchased: res.products }
            });

        }
        if (tag === 'Popular') {
            setProductByTag(prev => {
                return { ...prev, popular: res.products }
            });
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        getProductsByTag('New arrival');
        getProductsByTag('Most purchased');
        getProductsByTag('Popular');
    }, [])

    return <div className='w-full flex flex-col gap-6 rounded-lg'>
        <p className='px-6 font-light text-4xl'>Our Products</p>
        <OverflowCarousal products={productByTag.mostPurchased} title={'Most purchased'} />
        <OverflowCarousal products={productByTag.newArrived} title={'New arrival'} />
        <OverflowCarousal products={productByTag.popular} title={'Popular'} />
    </div>
}

export default ProductsByTagsSection;

function OverflowCarousal({ title, products }) {
    const [width, height] = useWindowSize();

    return <>
        {products && products.length > 0 && <div className='flex flex-col'>
            <p className='px-6 capitalize w-full self-start rounded-lg text-3xl font-light'>{title}</p>
            {products && products.length > 0 && <div className={`flex flex-col gap-4 overflow-x-scroll no-scrollbar overflow-y-hidden`}>
                {(width < 640) && <ComponentCarousel
                    className='h-full flex transition-all duration-700'
                    style={{
                        width: '260px', // product card size
                    }}
                    items={products.slice(0, 4)}
                    Child={ProductCard}
                >
                </ComponentCarousel>}
                {(width >= 640) && <div className={`w-full p-6 grid sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-start gap-4`}
                >
                    {products.slice(0, 4).map((product, index) => {
                        return <ProductCard product={product} index={index} arr={products.slice(0, 4)} />
                    })
                    }
                </div>}
            </div>}
            <Link to={`/products/tag/${title}`} state={{ name: title }} className="w-fit mx-6 px-6 py-1 cursor-pointer text-center rounded-lg bg-white text-black border border-black hover:bg-black hover:text-white">Load more...</Link>
            {products && products.length < 1 && <div>
                <p>No items found!</p>
            </div>}
        </div >
        }
    </>
}