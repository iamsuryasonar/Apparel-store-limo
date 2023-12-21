import Nav from './Nav';
import { Outlet } from 'react-router-dom'

function NavAndOutlet() {
    return <div className=''>
        <Nav />
        <div className='flex justify-center'>
            <Outlet />
        </div>
    </div>
}
export default NavAndOutlet;