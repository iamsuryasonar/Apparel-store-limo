import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { get_products_by_category_id, clearProducts } from '../../store/slices/productSlice'

function ProductsByCategoryPage() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)

    useEffect(() => {
        dispatch(get_products_by_category_id(id));
        return () => {
            dispatch(clearProducts());
        }
    }, [])

    return (
        <div className="max-w-7xl w-full flex flex-col items-center mt-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {products?.products && products?.products?.map((product) => {
                    return <>
                        <div className='relative'>
                            <div className='absolute top-6 left-6 -rotate-45 -translate-x-1/2 -translate-y-1/2 bg-teal-400 px-1 py-1'>
                                <p className=' text-white text-sm font-light'>{product?.tag}</p>
                            </div>
                            <div className='absolute bottom-0 left-0 right-0 bg-white  p-2 '>
                                <p className=' text-black'>{product?.name}</p>
                                <p className='  text-black'>₹ {product?.colorvariants[0]?.sizevariants[0].selling_price}</p>
                            </div>
                            <img className='object-cover w-full h-full' src={product?.colorvariants[0]?.images[0]?.url} />
                        </div>
                    </>
                })}
            </div >
        </div>
    )
}
export default ProductsByCategoryPage;