import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom'
import ProductsComponent from '../../components/ProductsComponent';
import { get_more_products_by_tag, get_products_by_tag } from '../../store/slices/productsByTagSlice';
import useScrollToTop from '../../hooks/useScrollToTop'
import usePaginationObserver from '../../hooks/usePaginationObserver';
import ProductsWithFilter from './components/ProductsWithFilter';

/* displays list of products by tag */
function ProductsByTagPage() {
    const { tag } = useParams();
    let { state } = useLocation();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsByTag.productsByTag)

    const [sortType, setSortType] = useState(null);
    const [removedCriteria, setRemovedCriteria] = useState(null);
    const [minMaxValue, setMinMaxValue] = useState({
        minValue: 0,
        maxValue: 100,
    });
    const [activeFilters, setActiveFilters] = useState({
        sortType: '',
        range: ''
    })

    /*  
    priceRange is multiple of 60 because RangeSlider does not allow range more than 100
    maximum price is assumed to be 6000 for now hence 60 multiplied by 100. 
    */
    const priceRange = [minMaxValue.minValue * 60, minMaxValue.maxValue * 60];

    const getProductByTag = (sortType) => {
        dispatch(get_products_by_tag({
            tag,
            pageNo: 0,
            sortType,
            from: priceRange[0],
            to: priceRange[1],
        }))
    }

    useEffect(() => {
        getProductByTag(sortType)
    }, [sortType, removedCriteria])

    const isTotalPagesFetched = products?.pagination?.page_no === products?.pagination?.total_pages;

    usePaginationObserver(isTotalPagesFetched, products, () => {
        dispatch(get_more_products_by_tag({
            tag,
            pageNo: products?.pagination?.page_no + 1,
            sortType,
            from: priceRange[0],
            to: priceRange[1],
        }))
    })

    useScrollToTop()

    return (
        <div className=" max-w-7xl  w-full flex flex-col items-center h-full">
            <div className="w-full">
                {/* {state?.bannerImage?.url} */}
                <img alt='banner' className="w-full h-[20rem] object-cover" src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className='w-full px-4 py-2 flex flex-row'>
                <p className='text-3xl font-light'>{state?.name}</p>
            </div>
            <ProductsWithFilter
                products={products}
                minMaxValue={minMaxValue}
                setMinMaxValue={setMinMaxValue}
                priceRange={priceRange}
                onDragEndHandler={getProductByTag}
                sortType={sortType}
                setSortType={setSortType}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                setRemovedCriteria={setRemovedCriteria}
            >
                <ProductsComponent products={products} />
            </ProductsWithFilter>
        </div>
    )
}

export default ProductsByTagPage;




