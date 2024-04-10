import React from 'react'
import ProductCard from './ProductCard';
import ProductShimmer from '../components/shimmers/ProductShimmer';

function ProductsComponent({ products }) {
    return <>
        {!products && <ProductShimmer />}
        {
            products?.products && products?.products?.map((product, index, arr) => {
                return <ProductCard key={index} product={product} index={index} arr={arr} />
            })
        }
    </>
}

export default React.memo(ProductsComponent);