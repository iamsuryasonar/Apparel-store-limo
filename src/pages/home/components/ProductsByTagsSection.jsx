
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Slider from "react-slick";
import { setLoading } from '../../../store/slices/loadingSlice';
import ProductsService from '../../../services/products.services'
import ProductCard from '../../../components/ProductCard'

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

    return <section>
        {(productByTag.mostPurchased || productByTag.newArrived || productByTag.popular) && <div className='w-full flex flex-col gap-6 rounded-lg'>
            {/* <p className='mx-6 py-2 font-light text-4xl border-b-[1px] border-slate-200'>Our Products</p> */}
            <MultiCarousel products={productByTag.mostPurchased} title={'Most purchased'} timer={2100} />
            <MultiCarousel products={productByTag.newArrived} title={'New arrival'} timer={2300} />
            <MultiCarousel products={productByTag.popular} title={'Popular'} timer={2100} />
        </div>}
    </section>
}

export default ProductsByTagsSection;

function MultiCarousel({ title, products }) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return <>
        {
            products && products.length > 0 && <div className='flex flex-col'>
                <div className='flex items-center justify-between'>
                    <p className='px-4 rounded-lg text-xl lg:text-2xl font-light capitalize'>{title}</p>
                    <Link to={`/products/tag/${title}`} state={{ name: title }} className="mx-6 my-1 px-6 py-1 cursor-pointer rounded-lg bg-white hover:bg-black border border-black text-sm text-center text-black hover:text-white  transition-colors duration-300">See more</Link>
                </div>
                <div className='px-2'>
                    <Slider {...settings}>
                        {products.slice(0, 6).map((product, index, arr) => {
                            return <React.Fragment key={product._id}>
                                <ProductCard product={product} index={index} arr={arr} />
                            </React.Fragment>
                        })}
                    </Slider>
                </div>
            </div >
        }
    </>
}

