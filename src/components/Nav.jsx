import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping, faXmark, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Cart from '../components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from './LoadingBar';
import { logout } from '../store/slices/authSlice'
import SignoutModal from './SignoutModal'

function Nav() {

    const [toggleCart, setToggleCart] = useState(false);
    const [menu, setMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.userData);
    const loading = useSelector((state) => state.loading.loading);
    const currentPageName = location.pathname;

    let navItems = [
        {
            id: 1,
            title: 'Sign Up',
            path: '/sign-up'
        },
        {
            id: 2,
            title: 'Log In',
            path: '/sign-in'
        },]

    let authNavItems = [
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

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const logOutHandler = () => {
        console.log("Attempting to log out...");
        dispatch(logout());
    }

    const toggleLogoutModal = () => {
        setShowLogoutModal(!showLogoutModal);
    }
    const confirmLogout = () => {
        console.log("Confirming logout...");
        toggleLogoutModal();
        logOutHandler();

    }
    const handleMobileMenuLogout = () => {
        confirmLogout();
        toggleMenu();
    }

    return (
        <>
            {loading && <LoadingBar />}
            <div className="fixed top-0 right-0 left-0 z-50 bg-slate-100 p-6 justify-between flex">
                <div className=' gap-5 uppercase items-center md:flex hidden'>
                    {user ?
                        authNavItems.map((item) => {
                            return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                        }) :
                        navItems.map((item) => {
                            return <Link key={item.id} to={item.path} className={`text-base hover:text-blue-600 hover:underline underline-offset-4 ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title}</Link>
                        })
                    }

                </div>

                <Link to={'/'} className='place-self-center text-3xl'>LIMO</Link>
                <div className='flex items-center gap-1 md:flex'>
                    <FontAwesomeIcon className="text-xl mr-3 hidden md:flex hover:text-blue-500" icon={faUser} />
                    <FontAwesomeIcon className='text-xl mr-3 hover:text-blue-500' icon={faMagnifyingGlass} />
                    <FontAwesomeIcon className='text-xl mr-3 hover:text-blue-500' onClick={() => setToggleCart(!toggleCart)} icon={faCartShopping} />
                    {/* signout button */}
                    {user &&
                        <>
                            <FontAwesomeIcon className="text-2xl mr-3 hidden md:flex  hover:text-red-700 " onClick={toggleLogoutModal} icon={faSignOut} />
                            {toggleLogoutModal &&
                                <SignoutModal isOpen={showLogoutModal} confirmLogout={confirmLogout} onClose={toggleLogoutModal} />
                            }
                        </>
                    }
                    {/* mobile menu toggle */}
                    <FontAwesomeIcon className="text-2xl hover:text-blue-500 md:hidden transition-all duration-300 ease-in-out place-self-center" icon={faBars} onClick={() => toggleMenu()} />
                </div>

                {toggleCart && (
                    <div className='w-full md:w-1/2 fixed top-0 right-0 bottom-0'>
                        <Cart setToggleCart={setToggleCart} />
                    </div>
                )}
                {menu && <div className='bg-white flex flex-col justify-center items-center gap-6 fixed top-0 bottom-0 right-0 left-1/4 md:hidden z-50'>
                    <FontAwesomeIcon className="text-3xl fixed top-7 right-10 hover:scale-150  hover:text-red-500 transition-all duration-300 ease-in-out " icon={faXmark} onClick={() => toggleMenu()} />
                    {user ?
                        authNavItems.map((item) => {
                            return <Link key={item.id} to={item.path} onClick={() => toggleMenu()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                        }) :
                        navItems.map((item) => {
                            return <Link key={item.id} to={item.path} onClick={() => toggleMenu()} className={`text-2xl hover:scale-150 transition-all duration-300 ease-in-out  ${currentPageName === item.path ? 'text-blue-600' : ''}`}>{item.title} </Link>
                        })
                    }
                    {user &&
                        <>
                            <FontAwesomeIcon className="text-xl mr-3  hover:text-blue-500" onClick={toggleLogoutModal} icon={faSignOut} />
                            {toggleLogoutModal &&
                                <SignoutModal isOpen={showLogoutModal} confirmLogout={handleMobileMenuLogout} onClose={toggleLogoutModal} />
                            }
                        </>
                    }
                </div>}
            </div>
        </>
    )
}

export default Nav;