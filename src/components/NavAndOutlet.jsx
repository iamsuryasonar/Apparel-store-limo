import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Footer from '../components/Footer'
import BottomAlert from './BottomAlert';

function NavAndOutlet() {

    const message = useSelector((state) => state.message.message);

    return <div className='relative bg-slate-50'>
        <Nav />
        <main className='relative flex mx-auto mt-[60px] min-h-screen w-full justify-center'>{/* putting overflow-hidden here will affect sticky property in FilterContainer*/}
            <Outlet />
        </main>
        <Footer />
        {message && <BottomAlert message={message} />}
    </div>
}
export default NavAndOutlet;