import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { get_products_by_category_id, clearProducts } from '../../store/slices/productSlice'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useNavigate } from 'react-router-dom'

function ProductsByCategoryPage() {
    const { id } = useParams();
    let { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)

    const [isFilterContainerVisible, setFilterContainerVisible] = useState(false);

    const [sortType, setSortType] = useState(null);
    const [removedCriteria, setRemovedCriteria] = useState(null);
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

    const getProductByCategoryId = () => {
        dispatch(get_products_by_category_id({
            id,
            sortType,
            from: priceRange[0],
            to: priceRange[1],
        }))
    }

    useEffect(() => {
        getProductByCategoryId()
    }, [sortType, removedCriteria])

    return (
        <div className="max-w-7xl  w-full flex flex-col items-center">
            <div className="w-full">
                {/* {state?.bannerImage?.url} */}
                <img className="w-full h-[20rem] object-cover" src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className='w-full p-4 flex flex-row'>
                <p className='text-3xl font-extrabold'>{state?.name}</p>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
            <div className='w-full flex bg-slate-50 items-center gap-6'>
                <div onClick={() => { setFilterContainerVisible(!isFilterContainerVisible) }} className='group border-r border-black flex items-center gap-2 p-2 cursor-pointer'>
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
            </div>
            <div className='w-full flex md:flex-row flex-col'>
                {isFilterContainerVisible &&
                    <div className='md:w-1/3 w-full h-full bg-slate-50 flex flex-col p-4 gap-4'>
                        <div>
                            <p className='uppercase font-thin'>By Price</p>
                            <div className='w-full h-[1px] bg-black'></div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p>Price low to high</p>
                            <input type="checkbox" checked={sortType === 'ASCENDING' ? true : false}
                                onChange={() => {
                                    sortHandler('ASCENDING')
                                }} />
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p>Price high to low</p>
                            <input type="checkbox" checked={sortType === 'DECENDING' ? true : false}
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
                        <div className='mt-4'>
                            <p className='uppercase font-thin'>By Tag</p>
                            <div className='w-full h-[1px] bg-black'></div>
                        </div>
                        <select name="" id="" className='px-2 py-1 cursor-pointer border-[1px] border-black'>
                            {/* options will be filled by data from API call or may be CONSTANT object */}
                            <option disabled value="Select...">Select...</option>
                            <option value="Popular">Popular</option>
                            <option value="Most purchased">Most purchased</option>
                        </select>
                    </div>
                }
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 mt-4 md:p-8 md:mt-0 gap-8">
                    {products?.products && products?.products?.map((product, index) => {
                        return <div key={index} className="w-full flex flex-col border border-slate-200 cursor-pointer group"
                            onClick={() => {
                                navigate(`/product/${product?._id}`, {
                                    state: { colorVariantId: product?.colorVariants?._id, sizeVariantId: product?.sizeVariants?._id, productId: product._id }
                                })
                            }}>
                            <div className='relative'>
                                <img className='object-cover w-full h-full' src={product?.images[0]?.url} />
                                <div className='absolute top-6 left-6 -rotate-45 -translate-x-1/2 -translate-y-1/2 bg-teal-400 px-1 py-1'>
                                    <p className='text-white text-sm font-light'>{product?.tag}</p>
                                </div>
                            </div>
                            <div className='bg-slate-50 text-black group-hover:bg-black group-hover:text-white p-2'>
                                <p className=''>{product?.name}</p>
                                <p className='text-slate-400 font-light text-sm'>{product?.category?.name}</p>
                                <div className='flex flex-row gap-4'>
                                    <p className=''>₹{product?.sizeVariants.selling_price}</p>
                                    <div className='flex flex-row gap-1'>
                                        <p className=' line-through text-slate-400'>₹{product?.sizeVariants.mrp} </p>
                                        <p className='text-green-400'>({Math.round(100 * (product?.sizeVariants.mrp - product?.sizeVariants.selling_price) / product?.sizeVariants.mrp)}% Off)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
export default ProductsByCategoryPage;