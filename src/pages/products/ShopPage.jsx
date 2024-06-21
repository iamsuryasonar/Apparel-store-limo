import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { get_products, get_more_products } from '../../store/slices/productsSlice'
import ProductsComponent from '../../components/ProductsComponent';
import useScrollToTop from '../../hooks/useScrollToTop'
import usePaginationObserver from '../../hooks/usePaginationObserver';
import ProductsWithFilter from './components/ProductsWithFilter';
import bannerImage from '../../assets/banner.jpg'


function ShopPage() {
    let { state } = useLocation();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)

    const [sortType, setSortType] = useState(null);
    const [minMaxValue, setMinMaxValue] = useState({
        minValue: 0,
        maxValue: 100,
    });

    /* priceRange is multiple of 60 because RangeSlider does not allow range more than 100
    maximum price is assumed to be 6000 for now hence 60 multiplied by 100. */
    const priceRange = [minMaxValue.minValue * 60, minMaxValue.maxValue * 60];

    const [activeFilters, setActiveFilters] = useState({
        sortType: '',
        range: ''
    })

    const getProducts = (sortType) => {
        dispatch(get_products({
            pageNo: 0,
            sortType,
            from: priceRange[0],
            to: priceRange[1],
        }))
    }

    useEffect(() => {
        getProducts(sortType)
    }, [sortType])

    usePaginationObserver(products, () => {
        dispatch(get_more_products({
            pageNo: products?.pagination?.page_no + 1,
            sortType,
            from: priceRange[0],
            to: priceRange[1],
        }))
    })

    useScrollToTop()

    return (
        <>
            <div className="max-w-6xl w-full flex flex-col items-center">
                <div className="w-full relative">
                    <img alt='banner' className="w-full h-[20rem] object-cover" src={bannerImage} />
                    <p className='absolute bottom-2 right-0 px-4 py-2 text-3xl font-light bg-white'>Shop</p>
                </div>
                <ProductsWithFilter
                    products={products}
                    minMaxValue={minMaxValue}
                    setMinMaxValue={setMinMaxValue}
                    priceRange={priceRange}
                    onDragEndHandler={getProducts}
                    sortType={sortType}
                    setSortType={setSortType}
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                    getProducts={getProducts}
                >
                    <ProductsComponent products={products} />
                </ProductsWithFilter>
            </div>
        </>
    )
}

export default ShopPage

