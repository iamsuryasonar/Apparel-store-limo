import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cart from '../components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from './LoadingBar';
import { get_all_cart_items } from '../store/slices/cartSlice'
import SearchComponent from './SearchComponent'
import { Transition } from 'react-transition-group';
import { setShowSearch } from '../store/slices/searchSlice';

function Nav() {
    const location = useLocation();
    const currentPageName = location.pathname;
    const dispatch = useDispatch();
    const [toggleCart, setToggleCart] = useState(false);
    const [menu, setMenu] = useState(false);
    const user = useSelector((state) => state.auth.userData);
    const loading = useSelector((state) => state.loading.loading);
    const cartItems = useSelector((state) => state.cart.cart);

    let navItems = [
        {
            id: 1,
            title: 'Home',
            path: '/'
        },
        {
            id: 2,
            title: 'Shop',
            path: '/shop'
        },
        {
            id: 3,
            title: 'Contact',
            path: '/contact-us'
        },
    ]

    let authNavItems = [

    ]

    const toggleMenu = () => {
        setMenu(!menu);
    };

    useEffect(() => {
        if (user) {
            dispatch(get_all_cart_items())
        }
    }, [user])

    return (
        <>
            {loading && <LoadingBar />}
            <div className="fixed h-20 top-0 right-0 left-0 z-20 bg-slate-100 p-4 justify-between flex ">
                <div className=' gap-5 uppercase items-center md:flex hidden'>
                    {user &&
                        authNavItems.map((item) => {
                            return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                        })

                    }
                    {
                        navItems.map((item) => {
                            return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                        })
                    }
                </div>

                {/* Logo */}
                <Link to={'/'} className='place-self-center text-3xl'>LIMO</Link>

                <div className='flex items-center gap-2 md:gap-4 md:flex'>
                    {/* search */}
                    <div onClick={() => { dispatch(setShowSearch(true)) }} className='group w-10 h-10 hover:bg-slate-200 grid place-items-center'>
                        <FontAwesomeIcon className='text-xl group-hover:text-blue-500' icon={faMagnifyingGlass} />
                    </div>

                    {/* acoount */}
                    <Link to={`${user ? '/account' : '/sign-in'}`} className={`group w-10 h-10 hover:bg-slate-200 grid place-items-center`}>
                        <FontAwesomeIcon className={`text-xl md:flex group-hover:text-blue-500  ${user ? 'text-green-500' : ''}`} icon={faUser} />
                    </Link>


                    {/* cart */}
                    {user &&
                        <div className='group w-10 h-10 hover:bg-slate-200 grid place-items-center relative cursor-pointer' onClick={() => setToggleCart(!toggleCart)}>
                            {cartItems?.length > 0 &&
                                <div className=' absolute top-0 right-0 bg-orange-400 w-5 h-5 rounded-full flex justify-center items-center '>
                                    <p className=''>{cartItems?.length}</p>
                                </div>}
                            <FontAwesomeIcon className='text-xl group-hover:text-blue-500' icon={faCartShopping} />
                        </div>
                    }

                    {/* mobile menu toggle */}
                    <div className='md:hidden group w-10 h-10 hover:bg-slate-200 grid place-items-center'>
                        <FontAwesomeIcon className="text-2xl group-hover:text-blue-500 place-self-center" icon={faBars} onClick={() => toggleMenu()} />
                    </div>
                </div>

                <Cart show={toggleCart} setToggleCart={setToggleCart} />

                <Transition in={menu} timeout={100}>
                    {(state) => (
                        <div className={` z-50  bg-white flex flex-col justify-center items-center gap-6 fixed md:hidden transition-transform transform ease-in-out duration-700 ${state === 'entered' ? 'translate-x-0 top-0 bottom-0 right-0 left-1/4' : 'translate-x-full top-0 bottom-0 right-0 left-1/4'}`}>
                            <div className='fixed top-6 right-6 group w-10 h-10 hover:bg-slate-200 grid place-items-center'>
                                <FontAwesomeIcon className="text-3xl" icon={faXmark} onClick={() => toggleMenu()} />
                            </div>
                            {user &&
                                authNavItems.map((item) => {
                                    return <Link key={item.id} to={item.path} onClick={() => toggleMenu()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                                })
                            }
                            {
                                navItems.map((item) => {
                                    return <Link key={item.id} to={item.path} onClick={() => toggleMenu()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out  ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                                })
                            }
                        </div>
                    )}
                </Transition >
            </div >
            <SearchComponent />
        </>
    )
}

export default Nav;