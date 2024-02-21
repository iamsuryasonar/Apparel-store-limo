import { Outlet } from 'react-router-dom'
import Nav from './Nav';
import Footer from '../components/Footer'
function NavAndOutlet() {

    return <div className='relative'>
        <Nav />
        <div className='flex mx-auto mt-[5rem] min-h-screen w-full justify-center overflow-hidden'>
            <Outlet />
        </div>
        <Footer />
    </div>
}
export default NavAndOutlet;