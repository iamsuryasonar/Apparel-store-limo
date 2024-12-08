import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Footer from '../components/Footer'
import BottomAlert from './BottomAlert';

function NavAndOutlet() {

    const message = useSelector((state) => state.message.message);

    return <div className='relative bg-white font-poppins'>
        <Nav />
        <main className='min-h-[calc(100svh-60px)] w-full flex justify-center relative mx-auto mt-[60px] '>{/* putting overflow-hidden here will affect sticky property in FilterContainer*/}
            <Outlet />
        </main>
        <Footer />
        {message && <BottomAlert message={message} />}
    </div>
}
export default NavAndOutlet;