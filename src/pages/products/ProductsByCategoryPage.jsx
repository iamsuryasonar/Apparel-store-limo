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

function ProductsByCategoryPage() {
    const { id } = useParams();
    let { state } = useLocation();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)
    const [isFilterContainerVisible, setFilterContainerVisible] = useState(false)
    const [sortType, setSortType] = useState(null);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);

    const handleInputChange = (values) => {
        setMinValue(values[0]);
        setMaxValue(values[1]);
    };


    useEffect(() => {
        dispatch(get_products_by_category_id(id));
        return () => {
            dispatch(clearProducts());
        }
    }, [])

    const priceSortHandler = (type) => {
        setSortType(type);
    }

    return (
        <div className="max-w-7xl w-full flex flex-col items-center">
            <div className="w-full">
                {/* {state?.bannerImage?.url} */}
                <img className="w-full h-[20rem] object-cover" src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className='w-full p-4 flex flex-row'>
                <p className='text-3xl font-extrabold'>{state?.name}</p>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
            <div className='w-full flex bg-slate-50'>
                <div onClick={() => { setFilterContainerVisible(!isFilterContainerVisible) }} className='group border-r border-black flex items-center gap-2 p-2 cursor-pointer'>
                    <p className='font-thin'>FILTER</p>
                    <FontAwesomeIcon className='group-hover:text-green-400' icon={isFilterContainerVisible ? faArrowUp : faArrowDown} />
                </div>
            </div>
            <div className='flex md:flex-row flex-col'>
                {isFilterContainerVisible &&
                    <div className='md:w-1/3 w-full h-full bg-slate-50 flex flex-col p-4 gap-4'>
                        <div>
                            <p className='uppercase font-thin'>By Price</p>
                            <div className='w-full h-[1px] bg-black'></div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p>Price low to high</p>
                            <input type="checkbox" checked={sortType === 'ascending' ? true : false}
                                onChange={() => {
                                    priceSortHandler('ascending')
                                }} />
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p>Price high to low</p>
                            <input type="checkbox" checked={sortType === 'decending' ? true : false}
                                onChange={() => { priceSortHandler('decending') }} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <RangeSlider
                                className='h-[4px]'
                                value={[minValue, maxValue]}
                                onInput={handleInputChange}
                            />
                            <div className='flex justify-between px-2'>
                                <p>{minValue}</p>
                                <p>{maxValue * 60}</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className='uppercase font-thin'>By Tag</p>
                            <div className='w-full h-[1px] bg-black'></div>
                        </div>
                        <select name="" id="" className='px-2 py-1 cursor-pointer border-[1px] border-black'>
                            <option disabled value="Select...">Select...</option>
                            <option value="Popular">Popular</option>
                            <option value="Most purchased">Most purchased</option>
                        </select>
                        <button className='text-white bg-black font-thin py-1 px-2 self-end'>APPLY</button>
                    </div>
                }
                <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4 gap-8">
                    {products?.products && products?.products?.map((product) => {
                        return <div key={product?._id} className="w-full flex flex-col">
                            <div className='relative'>
                                <img className='object-cover w-full h-full' src={product?.colorvariants[0]?.images[0]?.url} />
                                <div className='absolute top-6 left-6 -rotate-45 -translate-x-1/2 -translate-y-1/2 bg-teal-400 px-1 py-1'>
                                    <p className='text-white text-sm font-light'>{product?.tag}</p>
                                </div>
                            </div>
                            <div className='bg-white p-2'>
                                <p className='text-black'>{product?.name}</p>
                                <p className='text-black'>₹ {product?.colorvariants[0]?.sizevariants[0].selling_price}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
export default ProductsByCategoryPage;