import Nav from './Nav';
import { Outlet } from 'react-router-dom'

function NavAndOutlet() {
    return <>
        <Nav />
        <div className=''>
            <Outlet />
        </div>
    </>
}
export default NavAndOutlet;