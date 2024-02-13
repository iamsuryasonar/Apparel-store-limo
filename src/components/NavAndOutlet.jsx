import Nav from './Nav';
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function NavAndOutlet() {
    return <div className='relative'>
        <Nav />
        <div className='w-screen h-[4.4rem]'></div>
        <div className='flex mx-auto min-h-screen justify-center scroll-pt-0 overflow-x-hidden'>
            <Outlet />
        </div>
        <Footer />
    </div>
}
export default NavAndOutlet;