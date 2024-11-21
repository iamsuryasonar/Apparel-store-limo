import React from 'react'
import ProductCard from './ProductCard';
import ProductsShimmer from '../components/shimmers/ProductsShimmer';

function ProductsComponent({ products }) {
    return <>
        {!products && <ProductsShimmer />}
        {
            products?.products && products?.products?.map((product, index) => {
                return <ProductCard key={index} product={product} animate={true} />
            })
        }
        {/* for pagination */}
        {products?.products && <div className='scroll-container'></div>}
    </>
}

export default React.memo(ProductsComponent);