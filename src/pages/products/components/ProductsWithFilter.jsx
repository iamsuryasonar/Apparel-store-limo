import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import FilterContainer from './FilterContainer';

function ProductsWithFilter(props) {
    const {
        products,
        minMaxValue,
        setMinMaxValue,
        priceRange,
        onDragEndHandler,
        sortType,
        setSortType,
        activeFilters,
        setActiveFilters,
        getProducts,
    } = props;

    const [isFilterContainerVisible, setFilterContainerVisible] = useState(false);
    const numberOfProducts = (products?.pagination?.per_page * products?.pagination?.page_no) - products?.pagination?.total_products > 0 ? products?.pagination?.total_products : products?.pagination?.per_page * products?.pagination?.page_no;

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
        /* this function removes criteria of filter and sets values to default values.
        in the end gets the updated products */
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
        getProducts()
    }

    return (
        <>
            <div className='sticky top-[70px] w-full h-8 sm:h-12 flex bg-slate-50 items-center justify-between gap-6 z-10'>
                <div onClick={() => { setFilterContainerVisible(!isFilterContainerVisible) }} className='group ml-8  border-r border-black flex items-center gap-2 pr-2 cursor-pointer'>
                    <p className='font-thin'>FILTER</p>
                    <FontAwesomeIcon className='group-hover:text-green-400' icon={isFilterContainerVisible ? faArrowUp : faArrowDown} />
                </div>
                {(numberOfProducts !== 'NaN' && products?.pagination?.total_products)
                    ?
                    <div className='mr-8 flex gap-1 text-sm sm:text-lg font-semibold text-slate-500'>
                        <span>{numberOfProducts}</span>
                        <span>of</span>
                        <span> {products?.pagination?.total_products}</span>
                    </div>
                    :
                    <div className='mr-8 flex gap-1 text-sm sm:text-lg font-semibold text-slate-500'>
                        <span>{0}</span>
                        <span>of</span>
                        <span>{0}</span>
                    </div>
                }
            </div>
            <div className='w-full flex sm:flex-row flex-col'>
                {isFilterContainerVisible &&
                    <FilterContainer
                        setFilterContainerVisible={setFilterContainerVisible}
                        sortType={sortType} sortHandler={sortHandler}
                        priceRange={priceRange}
                        handleRangeChange={handleRangeChange}
                        minMaxValue={minMaxValue}
                        activeFilters={activeFilters}
                        onDragEndHandler={onDragEndHandler}
                        removeFilterCriteria={removeFilterCriteria} />
                }
                <div className={`w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center p-4 mt-4 md:p-8 md:mt-0 gap-4 sm:gap-10`}>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default ProductsWithFilter;