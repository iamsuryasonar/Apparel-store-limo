import 'react-range-slider-input/dist/style.css';
import RangeSlider from 'react-range-slider-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function FilterContainer(props) {
    const {
        setFilterContainerVisible,
        sortType,
        priceRange,
        handleRangeChange,
        minMaxValue,
        sortHandler,
        activeFilters,
        onDragEndHandler,
        removeFilterCriteria
    } = props;

    return <div className='z-50 sm:z-0 fixed sm:sticky top-0 sm:top-32 bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 sm:right-auto min-h-screen w-full sm:w-64 bg-white border-t-[1px] border-r-[1px]'>
        <div className='z-50 sm:z-10 absolute top-20 bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 sm-right-auto sm:sticky sm:top-32 sm:w-full h-auto bg-white flex flex-col p-4 gap-6 '>
            <div>
                <div className='flex justify-between items-center'>
                    <p className='uppercase font-thin'>By Price</p>
                    <FontAwesomeIcon onClick={
                        () => setFilterContainerVisible(false)
                    } className='hover:text-green-400 text-xl flex sm:hidden' icon={faXmark} />
                </div>
                <div className='w-full h-[1px] bg-black'></div>
            </div>
            <div className='flex flex-row justify-between'>
                <label htmlFor='pricelowtohigh'>Price low to high</label>
                <input if='pricelowtohigh' className=' h-5 w-5' type="checkbox" checked={sortType === 'ASCENDING' ? true : false}
                    onChange={() => {
                        sortHandler('ASCENDING')
                    }} />
            </div>
            <div className='flex flex-row justify-between'>
                <label htmlFor='pricehightolow'>Price high to low</label>
                <input id='pricehightolow'
                    className=' h-5 w-5'
                    type="checkbox"
                    checked={sortType === 'DECENDING' ? true : false}
                    onChange={() => {
                        sortHandler('DECENDING')
                    }} />
            </div>
            <div className='flex flex-col gap-2'>
                <RangeSlider
                    className='h-[4px]'
                    value={[minMaxValue.minValue, minMaxValue.maxValue]}
                    onInput={handleRangeChange}
                    onThumbDragEnd={onDragEndHandler}
                    onRangeDragEnd={onDragEndHandler}
                />
                <div className='flex justify-between px-2'>
                    <p>{priceRange[0]}</p>
                    <p>{priceRange[1]}</p>
                </div>
            </div>
            <div className='grid grid-cols-1 py-2 gap-4'>
                {activeFilters?.sortType &&
                    <div className='flex justify-between gap-2 bg-slate-100 rounded-2xl px-4 py-1'>
                        <p>{activeFilters?.sortType}</p>
                        <button className='cursor-pointer hover:text-green-400 px-2'
                            onClick={() => {
                                removeFilterCriteria('SORT_TYPE');
                            }}>x</button>
                    </div>
                }
                {activeFilters?.range &&
                    <div className='flex justify-between gap-2 bg-slate-100 rounded-2xl px-4 py-1'>
                        <p>{activeFilters?.range}</p>
                        <button className='cursor-pointer hover:text-green-400 px-2'
                            onClick={() => {
                                removeFilterCriteria('RANGE');
                            }}>x</button>
                    </div>
                }
                {activeFilters?.sortType !== '' && activeFilters?.range !== '' &&
                    <div className='flex justify-between gap-2 bg-slate-100 rounded-2xl px-4 py-1'>
                        <p className='font-thin'>Clear Filter</p>
                        <button className='cursor-pointer hover:text-green-400 px-2'
                            onClick={() => {
                                removeFilterCriteria('ALL');
                            }}>x</button>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default FilterContainer;
