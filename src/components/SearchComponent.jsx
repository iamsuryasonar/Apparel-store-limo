import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { setShowSearch } from '../store/slices/searchSlice';
import { setLoading } from '../store/slices/loadingSlice'
import { API_URL } from '../utilities/constants';
import ProductsComponent from '../components/ProductsComponent';
import ScrollToTopButton from '../components/ScrollToTopButton';
import useDebounce from '../hooks/useDebounce';
import useOutsideClick from '../hooks/useOutSideClick';
import usePaginationObserver from '../hooks/usePaginationObserver';

const SearchComponent = () => {
    const scrollToElement = useRef(null);
    const containerRef = useRef(null);

    useOutsideClick(containerRef, () => {
        dispatch(setShowSearch(false));
    });

    const dispatch = useDispatch();
    const show = useSelector((state) => state.search.show);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [result, setResult] = useState({
        products: [],
        pagination: [],
    });

    /* prevents body from scrolling while search component is active */
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    const handleSearch = async (searchedKeyword, pageNo) => {
        dispatch(setLoading(true))
        const response = await axios
            .get(API_URL + 'product/by_name/' + searchedKeyword, {
                params: {
                    page: pageNo,
                },
                headers: { 'Content-Type': 'application/json', }
            });
        dispatch(setLoading(false))
        if (response?.data?.code === 200) {
            setResult(response.data.results);
        }
    }

    const debounced = useDebounce(handleSearch, 300)

    const getMoreOfSearchedProducts = async (searchedKeyword, pageNo) => {
        dispatch(setLoading(true))

        const response = await axios
            .get(API_URL + 'product/by_name/' + searchedKeyword, {
                params: {
                    page: pageNo,
                },
                headers: { 'Content-Type': 'application/json', }
            });

        if (response?.data?.code === 200) {
            setResult(prev => {
                return {
                    products: [...prev.products, ...response.data.results.products],
                    pagination: response.data.results.pagination,
                }
            })
        }

        dispatch(setLoading(false))
    }

    const onInputChangeHandler = (e) => {
        setSearchKeyword(e.target.value);

        if (e.target.value !== '') {
            debounced(e.target.value, 1); // when input value changes debounced search function is called
        } else {
            setResult({
                products: [],
                pagination: [],
            });
        }
    }

    const handleClearButtonClick = () => {
        setSearchKeyword('');
        setResult({
            products: [],
            pagination: [],
        });
    };

    usePaginationObserver(result, () => {
        getMoreOfSearchedProducts(
            searchKeyword,
            result?.pagination?.page_no + 1
        )
    });

    return (
        <Transition in={show} timeout={100}>
            {(state) => (
                <div
                    className={`z-40 fixed rounded-lg transition-transform transform ease-in-out duration-700 overflow-hidden ${state === 'entered' ? 'translate-x-0 top-2 bottom-2 left-2 right-2 flex' : 'translate-x-full top-2 bottom-2 left-2 right-0 none'}`}>
                    <div ref={containerRef} className='max-w-6xl mx-auto w-full h-full flex flex-col gap-2 p-4 bg-white rounded-md border'>
                        <div className='h-auto z-50 bg-white relative top-0 w-full py-4 flex flex-row justify-between items-center gap-4' >
                            <div className="w-full relative">
                                <input
                                    onChange={onInputChangeHandler}
                                    value={searchKeyword}
                                    name="search"
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-full bg-transparent border-b-[1px] border-black focus:border-blue-500 outline-none px-4 py-1 text-xl"
                                ></input>
                                {searchKeyword && <button
                                    className="absolute top-1/2 right-0 -translate-y-1/2 text-slate-400 hover:text-slate-800 focus:outline-none border-[1px] border-slate-400 hover:border-slate-800 rounded-full px-2 flex items-center gap-1"
                                    onClick={handleClearButtonClick}
                                >
                                    <p>clear</p> <FontAwesomeIcon className="text-xl" icon={faXmark} />
                                </button>}
                            </div>
                            <button
                                onClick={() => {
                                    dispatch(setShowSearch(false));
                                }}
                                className='group w-10 h-10 hover:bg-slate-300 grid place-items-center cursor-pointer'>
                                <FontAwesomeIcon className="text-3xl group-hover:text-red-500" icon={faXmark}
                                />
                            </button>
                        </div>
                        <div ref={scrollToElement} className='overflow-auto scrollbar py-2'>
                            <div className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
                                {result?.products?.length > 0 && <ProductsComponent products={result} />}
                            </div>
                        </div>
                    </div>
                    {result?.products.length <= 4
                        ? <></>
                        : <ScrollToTopButton scrollToElement={scrollToElement} />
                    }
                </div>
            )}
        </Transition>
    );
};

export default SearchComponent;
