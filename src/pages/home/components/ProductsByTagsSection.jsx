import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../store/slices/loadingSlice';
import ProductsService from '../../../services/products.services'
import ProductCard from '../../../components/ProductCard'
import MultiCarousel from '../../../components/MultiCarousel';

function ProductsByTagsSection() {
    const TAGS = ['New arrival', 'Most purchased'];
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading.loading);

    const [productByTag, setProductByTag] = useState({
        newArrived: null,
        mostPurchased: null,
        popular: null,
    })

    const fetchProductsByTag = async (tag) => {
        dispatch(setLoading(true));
        const res = await ProductsService.getProductsByTag({ tag, pageNo: 0, from: 0, to: 99999 });
        setProductByTag((prev) => ({ ...prev, [tag]: res.products }));
        dispatch(setLoading(false));
    };


    useEffect(() => {
        TAGS.forEach((tag) => fetchProductsByTag(tag));
    }, [])

    return <section>
        {
            TAGS.map((tag) => {
                return <div key={tag} className='flex flex-col'>
                    <div className='flex items-center justify-between'>
                        <p className='px-4 rounded-lg text-xl lg:text-2xl font-light capitalize'>{tag}</p>
                        <Link to={`/products/tag/${tag}`} state={{ name: tag }} aria-label={`see more ${tag} products`} className="mx-6 my-1 px-6 py-1 cursor-pointer rounded-lg bg-white hover:bg-black border border-black text-sm text-center text-black hover:text-white  transition-colors duration-300">See more</Link>
                    </div>
                    <MultiCarousel
                        key={tag}
                        data={productByTag[tag]}
                        renderSlide={(product, index, arr) => <ProductCard product={product} index={index} arr={arr} />}
                    />
                </div>
            })
        }
        {
            loading && <div className="relative h-[250px] rounded-md my-2 w-full bg-gray-100 animate-pulse">
                <div className='absolute left-[10px] top-1/2 -translate-y-1/2 rounded-full w-[40px] h-[40px] bg-gray-200 animate-pulse'></div>
                <div className='absolute right-[10px] top-1/2 -translate-y-1/2 rounded-full w-[40px] h-[40px] bg-gray-200 animate-pulse'></div>
            </div>
        }
    </section>
}

export default ProductsByTagsSection;


