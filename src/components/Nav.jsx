import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Cart from '../components/Cart'
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/slices/authSlice'

function Nav() {
 
    const [toggleCart, setToggleCart] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();


    let navItems = [{
        id: 1,
        title: 'Log In',
        path: '/'
    },
    {
        id: 2,
        title: 'Sign Up',
        path: '/sign-up'
    },
]

const logOutHandler = () => {
    dispatchEvent()
}

    return (
        <div className="fixed top-0 right-0 left-0 z-10 bg-slate-100 p-6 flex justify-between ">
            <div className='flex gap-5 uppercase'>
                <Link to='/' className="hover:underline">Home</Link>
                <Link to='/shop' className="hover:underline">Shop</Link>
                <Link to='/contact-us' className="hover:underline">Contact</Link>
            </div>
            <h1>LIMO</h1>
            <div className='flex gap-5 text-xl'>
                <Link to='/sign-up' className="hover:underline"><FontAwesomeIcon icon={faUser} /></Link>
                <Link to='' className="hover:underline"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                <FontAwesomeIcon className='self-center' onClick={() => setToggleCart(!toggleCart)} icon={faCartShopping} />
            </div>
            {toggleCart && (
                <div className='w-full md:w-1/2 fixed top-0 right-0 bottom-0'>
                    <Cart setToggleCart={setToggleCart} />
                </div>
            )}
        </div>
    )
}

export default Nav;

