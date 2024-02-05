import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Cart from '../components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from './LoadingBar';
import { logout } from '../store/slices/authSlice'

function Nav() {

    const [toggleCart, setToggleCart] = useState(false);
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.userData);
    const loading = useSelector((state) => state.loading.loading);
    const currentPageName = location.pathname;

    let navItems = [{
        id: 1,
        title: 'Log In',
        path: '/sign-in'
    },
    {
        id: 2,
        title: 'Sign Up',
        path: '/sign-up'
    },]

    let authNavItems = [
        {
            id: 1,
            title: 'Home',
            path: '/'
        },
        {
            id: 2,
            title: 'Contact',
            path: '/contact-us'
        },
        {
            id: 3,
            title: 'Shop',
            path: '/shop'
        },
    ]

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const logOutHandler = () => {
        dispatch(logout());
    }

    return (
        <>
            {
                loading && <LoadingBar />
            }
            <div className="fixed top-0 right-0 left-0 z-10 bg-slate-100 p-6 flex justify-between ">
                <div className='flex gap-5 uppercase items-center'>
                    {user ?
                        authNavItems.map((item) => {
                            return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                        }) :
                        navItems.map((item) => {
                            return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                        })
                    }
                    {
                        user &&
                        <button onClick={logOutHandler}
                            className='p-2 rounded-xl bg-slate-500 flex justify-center items-center text-white font-bold'>
                            Log Out
                        </button>
                    }
                </div>

                <h1 className='place-self-center text-3xl'>LIMO</h1>
                <div className='gap-5 text-xl hidden md:flex items-center' >
                    <Link to='' className="hover:text-blue-500"><FontAwesomeIcon icon={faUser} /></Link>
                    <Link to='' className="hover:text-blue-500"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                    <FontAwesomeIcon className='hover:text-blue-500' onClick={() => setToggleCart(!toggleCart)} icon={faCartShopping} />
                </div>

                {toggleCart && (
                    <div className='w-full md:w-1/2 fixed top-0 right-0 bottom-0'>
                        <Cart setToggleCart={setToggleCart} />
                    </div>
                )}
                <FontAwesomeIcon className="text-2xl md:hidden hover:scale-150 hover:text-blue-500 transition-all duration-300 ease-in-out place-self-center" icon={faBars} onClick={() => toggleMenu()} />
            </div>
            {menu && <div className='bg-white flex flex-col justify-center items-center gap-6 fixed top-0 bottom-0 right-0 left-1/4 md:hidden z-10'>
                <FontAwesomeIcon className="text-3xl fixed top-7 right-10 hover:scale-150  hover:text-red-500 transition-all duration-300 ease-in-out " icon={faXmark} onClick={() => toggleMenu()} />
                {
                    user ?
                        authNavItems.map((item) => {
                            return <Link key={item.id} to={item.path} onClick={() => toggleMenu()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                        }) :
                        navItems.map((item) => {
                            return <Link key={item.id} to={item.path} onClick={() => toggleMenu()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out  ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                        })
                }
                {
                    user &&
                    <div className='gap-5 text-xl flex' >
                        <Link to='' className="hover:text-blue-500"><FontAwesomeIcon icon={faUser} /></Link>
                        <Link to='' className="hover:text-blue-500"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                        <FontAwesomeIcon className='hover:text-blue-500'
                            onClick={() => {
                                setToggleCart(!toggleCart)
                                toggleMenu();
                            }} icon={faCartShopping} />
                    </div>
                }
                {
                    user &&
                    <button onClick={() => {
                        logOutHandler();
                        toggleMenu();
                    }
                    } className='p-4 rounded-xl bg-slate-500 flex justify-center items-center text-white font-bold'>
                        Log Out
                    </button>
                }
            </div>}

        </>
    )
}

export default Nav;

