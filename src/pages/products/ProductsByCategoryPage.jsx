import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { get_products_by_category_id, get_more_products_by_category_id } from '../../store/slices/productsByCategorySlice'
import ProductCard from './components/ProductCard'

function ProductsByCategoryPage() {
    const { id } = useParams();
    let { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsByCategory.productsByCategory)
    const numberOfProducts = (products?.pagination?.per_page * products?.pagination?.page_no) - products?.pagination?.total_products > 0 ? products?.pagination?.total_products : products?.pagination?.per_page * products?.pagination?.page_no;
    const [isFilterContainerVisible, setFilterContainerVisible] = useState(false);

    const [sortType, setSortType] = useState(null);
    const [removedCriteria, setRemovedCriteria] = useState(null);
    const observer = useRef();

    const [minMaxValue, setMinMaxValue] = useState({
        minValue: 0,
        maxValue: 100,
    });

    // priceRange is multiple of 60 because RangeSlider does not allow range more than 100
    // maximum price is assumed to be 6000 for now hence 60 multiplied by 100.
    const priceRange = [minMaxValue.minValue * 60, minMaxValue.maxValue * 60];

    const [activeFilters, setActiveFilters] = useState({
        sortType: '',
        range: ''
    })

    const sortHandler = (type) => {
        setSortType(type);
        setActiveFilters({
            ...activeFilters,
            sortType: type,
        })
    }

    const handleRangeChange = (values) => {
        setMinMaxValue({
            minValue: values[0],
            maxValue: values[1],
        })
        setActiveFilters({
            ...activeFilters,
            range: '₹ ' + values[0] * 60 + ' - ' + '₹ ' + values[1] * 60
        })
    };



    const removeFilterCriteria = (type) => {
        //this function removes criteria of filter and sets values to default values.
        // updating removedCriteria triggers useEffect to get updated product values
        //todo: this needs to be dynamic
        if (type === 'RANGE') {
            setMinMaxValue((prev) => ({
                ...prev,
                minValue: 0,
                maxValue: 100,
            }))
            setActiveFilters({
                ...activeFilters,
                range: ''
            })
        }

        if (type === 'SORT_TYPE') {
            setSortType(null);
            setActiveFilters({
                ...activeFilters,
                sortType: '',

            })
        }

        if (type === 'ALL') {
            setSortType(null);
            setMinMaxValue((prev) => ({
                ...prev,
                minValue: 0,
                maxValue: 100,
            }))
            setActiveFilters({
                sortType: '',
                range: '',
            })
        }
        setRemovedCriteria(type)
    }

    const getProductByCategoryId = (sortType) => {
        dispatch(get_products_by_category_id({
            id,
            pageNo: 0,
            sortType,
            from: priceRange[0],
            to: priceRange[1],
        }))
    }

    useEffect(() => {
        getProductByCategoryId(sortType)
    }, [sortType, removedCriteria])

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {

                if (products?.pagination?.page_no === products?.pagination?.total_pages) {
                    // if total pages retrieved, disconnect the obeserver and return
                    observer.current.disconnect();
                    return;
                }

                // another slice to get one more page and append it to the
                // previously fetched products list also replacing pagination information
                dispatch(get_more_products_by_category_id({
                    id,
                    pageNo: products?.pagination?.page_no + 1,
                    sortType,
                    from: priceRange[0],
                    to: priceRange[1],
                }))

                observer.current.disconnect();
            }
        }, { threshold: 0.5 });

        const scrollContainer = document.querySelector('.scroll-container');

        if (scrollContainer) {
            // observes the scroll-container className that is attached to the last third product card
            observer.current.observe(scrollContainer);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [products]);

    return (
        <div className=" max-w-7xl  w-full flex flex-col items-center">
            <div className="w-full">
                {/* {state?.bannerImage?.url} */}
                <img className="w-full h-[20rem] object-cover" src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className='w-full p-4 flex flex-row'>
                <p className='text-3xl font-extrabold'>{state?.name}</p>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
            <div className='fixed md:sticky top-20 w-full h-12 flex bg-slate-50 items-center justify-between gap-6 z-10'>
                <div onClick={() => { setFilterContainerVisible(!isFilterContainerVisible) }} className='group ml-8 border-r border-black flex items-center gap-2 p-2 cursor-pointer'>
                    <p className='font-thin'>FILTER</p>
                    <FontAwesomeIcon className='group-hover:text-green-400' icon={isFilterContainerVisible ? faArrowUp : faArrowDown} />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-2 md:py-0 gap-1 md:gap-4'>
                    {activeFilters?.sortType &&
                        <div className='flex justify-between gap-2 bg-slate-100 rounded-2xl px-2'>
                            <p>{activeFilters?.sortType}</p>
                            <p className='cursor-pointer hover:text-green-400'
                                onClick={() => {
                                    removeFilterCriteria('SORT_TYPE');
                                }}>x</p>
                        </div>
                    }
                    {activeFilters?.range &&
                        <div className='flex justify-between gap-2 bg-slate-100 rounded-2xl px-2'>
                            <p>{activeFilters?.range}</p>
                            <p className='cursor-pointer hover:text-green-400'
                                onClick={() => {
                                    removeFilterCriteria('RANGE');
                                }}>x</p>
                        </div>
                    }
                    {activeFilters?.sortType !== '' && activeFilters?.range !== '' &&
                        <div className='flex justify-between gap-2 bg-slate-100 rounded-2xl px-2'>
                            <p className='font-thin'>Clear Filter</p>
                            <p className='cursor-pointer hover:text-green-400'
                                onClick={() => {
                                    removeFilterCriteria('ALL');
                                }}>x</p>
                        </div>
                    }
                </div>
                {numberOfProducts !== 'NaN' && products?.pagination?.total_products ? <div className='mr-8 flex gap-1 text-lg font-semibold text-slate-500'><span>{numberOfProducts}</span><span>of</span><span> {products?.pagination?.total_products}</span></div> : <div></div>}
            </div>
            <div className='w-full flex lg:flex-row flex-col'>
                {isFilterContainerVisible &&
                    <div className=' md:sticky md:top-32 w-full h-full md:h-screen lg:w-1/3 bg-slate-50 '>
                        <div className=' md:sticky md:top-32 w-full bg-slate-50 flex flex-col p-4 gap-6 '>
                            <div>
                                <p className='uppercase font-thin'>By Price</p>
                                <div className='w-full h-[1px] bg-black'></div>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p>Price low to high</p>
                                <input className=' h-5 w-5' type="checkbox" checked={sortType === 'ASCENDING' ? true : false}
                                    onChange={() => {
                                        sortHandler('ASCENDING')
                                    }} />
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p>Price high to low</p>
                                <input className=' h-5 w-5' type="checkbox" checked={sortType === 'DECENDING' ? true : false}
                                    onChange={() => { sortHandler('DECENDING') }} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <RangeSlider
                                    className='h-[4px]'
                                    value={[minMaxValue.minValue, minMaxValue.maxValue]}
                                    onInput={handleRangeChange}
                                    onThumbDragEnd={getProductByCategoryId}
                                    onRangeDragEnd={getProductByCategoryId}
                                />
                                <div className='flex justify-between px-2'>
                                    <p>{priceRange[0]}</p>
                                    <p>{priceRange[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  p-4 mt-4 md:p-8 md:mt-0 gap-4">
                    {products?.products && products?.products?.map((product, index, arr) => {
                        return <ProductCard product={product} index={index} arr={arr} />
                    })}
                </div>
            </div>
            <div
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}
                className='group fixed bottom-4 right-4 w-10 aspect-square rounded-full bg-orange-400 flex justify-center items-center '>
                <FontAwesomeIcon className='group-hover:text-white cursor-pointer' icon={faArrowUp} />
            </div>
        </div>
    )
}
export default ProductsByCategoryPage;
