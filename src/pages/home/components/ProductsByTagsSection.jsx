import React, { useEffect, useState, lazy, Suspense } from 'react';
import ProductsService from '../../../services/products.services'
import ProductCard from '../../../components/ProductCard'
import { Link } from 'react-router-dom'
import { setLoading } from '../../../store/slices/loadingSlice';
import { useDispatch } from 'react-redux'
import useWindowSize from '../../../hooks/useWindowSize'
import LoadingComponent from '../../../components/fallback/LoadingComponent'
const ComponentCarousel = lazy(() => import('../../../components/carousal/ComponentCarousel'))

function ProductsByTagsSection() {
    const dispatch = useDispatch();

    const [productByTag, setProductByTag] = useState({
        newArrived: null,
        mostPurchased: null,
        popular: null,
    })

    const getProductsByTag = async (data) => {
        dispatch(setLoading(true))

        const res = await ProductsService.getProductsByTag(data)
        if (data.tag === 'New arrival') {
            setProductByTag(prev => {
                return { ...prev, newArrived: res.products }
            });
        }
        if (data.tag === 'Most purchased') {
            setProductByTag(prev => {
                return { ...prev, mostPurchased: res.products }
            });

        }
        if (data.tag === 'Popular') {
            setProductByTag(prev => {
                return { ...prev, popular: res.products }
            });
        }

        dispatch(setLoading(false))
    }

    useEffect(() => {
        getProductsByTag({
            tag: 'New arrival',
            pageNo: 0,
            from: 0,
            to: 99999,
        });

        getProductsByTag({
            tag: 'Most purchased',
            pageNo: 0,
            from: 0,
            to: 99999,
        });

        getProductsByTag({
            tag: 'Popular',
            pageNo: 0,
            from: 0,
            to: 99999,
        });
    }, [])

    return <>
        {(productByTag.mostPurchased || productByTag.newArrived || productByTag.popular) && <div className='w-full flex flex-col gap-2 rounded-lg'>
            {/* <p className='mx-6 py-2 font-light text-4xl border-b-[1px] border-slate-200'>Our Products</p> */}
            <OverflowCarousal products={productByTag.mostPurchased} title={'Most purchased'} timer={2100} />
            <OverflowCarousal products={productByTag.newArrived} title={'New arrival'} timer={2300} />
            <OverflowCarousal products={productByTag.popular} title={'Popular'} timer={2100} />
        </div>}
    </>
}

export default ProductsByTagsSection;

function OverflowCarousal({ title, products, timer }) {
    const [width, height] = useWindowSize();

    return <>
        {products && products.length > 0 && <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <p className='px-4 capitalize rounded-lg text-3xl font-light'>{title}</p>
                <Link to={`/products/tag/${title}`} state={{ name: title }} className="mx-6 my-3 px-6 py-1 cursor-pointer text-center rounded-lg bg-white text-black border border-black hover:bg-black hover:text-white transition-colors duration-300">See more</Link>
            </div>
            {products && products.length > 0 && <div className={`flex flex-col gap-4 overflow-x-scroll no-scrollbar overflow-y-hidden`}>
                {(width < 640) && (
                    <Suspense fallback={<LoadingComponent />}>
                        <ComponentCarousel
                            className='h-full flex transition-all duration-700'
                            style={{
                                width: '260px', // product card size
                            }}
                            items={products.slice(0, 4)}
                            Child={ProductCard}
                            timer={timer}
                        >
                        </ComponentCarousel>
                    </Suspense>)}
                {(width >= 640) && <div className={`w-full p-4 grid sm:grid-cols-[repeat(auto-fill,minmax(220px,min-content))] justify-start gap-4`}
                >
                    {products.slice(0, 4).map((product, index) => {
                        return <ProductCard key={index} product={product} index={index} arr={products.slice(0, 4)} animate={false} />
                    })
                    }
                </div>}
            </div>}

        </div >
        }
    </>
}

