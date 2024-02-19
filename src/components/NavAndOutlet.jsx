import Nav from './Nav';
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
function NavAndOutlet() {
    
    return <div className='relative'>
        <Nav />
        <div className='flex mx-auto mt-[5rem] min-h-screen justify-center '>
            <Outlet />
        </div>
        <Footer />
    </div>
}
export default NavAndOutlet;