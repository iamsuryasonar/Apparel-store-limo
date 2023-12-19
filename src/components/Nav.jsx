import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'

function Nav() {
    return (
        <nav className="container bg-slate-200 p-6 flex justify-between">
            <div className='flex gap-5 uppercase'>
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">Shop</a>
                <a href="#" className="hover:underline">Contact</a>
            </div>
            <h1>LIMO</h1>
            <div className='flex gap-5'>
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <FontAwesomeIcon icon={faCartShopping} />
            </div>
        </nav>
    )
}

export default Nav;