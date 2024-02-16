import ProductCard from './ProductCard';

function ProductsComponent({ products }) {
    return <>
        {
            products?.products && products?.products?.map((product, index, arr) => {
                return <ProductCard key={index} product={product} index={index} arr={arr} />
            })
        }
    </>
}

export default ProductsComponent;