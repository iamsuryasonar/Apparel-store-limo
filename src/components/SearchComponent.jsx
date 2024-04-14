import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { setShowSearch } from '../store/slices/searchSlice';
import { setLoading } from '../store/slices/loadingSlice'
import { API_URL } from '../utilities/constants';
import ProductsComponent from '../components/ProductsComponent';
import ScrollToTopButton from '../components/ScrollToTopButton';
import useDebounce from '../hooks/useDebounce';
import useOutsideClick from '../hooks/useOutSideClick';

const SearchComponent = () => {
    const observer = useRef();
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

    /* to prevent body from scrolling while search component is active */
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

    const handlePagination = async (searchedKeyword, pageNo) => {
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
            setResult(prev => {
                return {
                    products: [...prev.products, ...response.data.results.products],
                    pagination: [response.data.results.pagination],
                }
            })
        }
    }

    const onInputChangeHandler = (e) => {
        setSearchKeyword(e.target.value);
        if (e.target.value !== '') {
            debounced(e.target.value, 1); // when input value changes debounced function is called
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

    const observeScroll = () => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {

                if (result?.pagination?.page_no === result?.pagination?.total_pages) {
                    /* if total pages retrieved, disconnect the obeserver and return */
                    observer.current.disconnect();
                    return;
                }

                handlePagination(searchKeyword, result?.pagination?.page_no + 1,)

                observer.current.disconnect();
            }
        }, { threshold: 0.5 });

        const scrollContainer = document.querySelector('.scroll-container');

        if (scrollContainer) {
            /* observes the scroll-container className that is attached to the last third product card */
            observer.current.observe(scrollContainer);
        }
    }

    useEffect(() => {

        observeScroll();

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [result]);

    return (
        <Transition in={show} timeout={100}>
            {(state) => (
                <div className={`z-40 fixed rounded-lg transition-transform transform ease-in-out duration-700 overflow-hidden ${state === 'entered' ? 'translate-x-0 top-2 bottom-2 left-2 right-2' : 'translate-x-full top-2 bottom-2 left-2 right-0'}`}>
                    <div ref={containerRef} className='max-w-7xl mx-auto w-full h-full flex flex-col gap-2 p-4 bg-slate-200 rounded-md'>
                        <div className='h-auto z-50 bg-slate-200 relative top-0 w-full py-6 flex flex-row justify-between items-center gap-4' >
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
                            <div className='group w-10 h-10 hover:bg-slate-300 grid place-items-center'>
                                <FontAwesomeIcon className="text-3xl group-hover:text-red-500" icon={faXmark}
                                    onClick={() => {
                                        dispatch(setShowSearch(false));
                                    }} />
                            </div>
                        </div>
                        <div ref={scrollToElement} className='overflow-auto scrollbar'>
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
