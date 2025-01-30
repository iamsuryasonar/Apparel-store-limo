import { Outlet } from 'react-router-dom'
import Nav from './Nav';
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';

function NavAndOutlet() {

    return <div className='relative bg-white font-poppins'>
        <Nav />
        <main className='min-h-[calc(100svh-60px)] w-full flex justify-center relative mx-auto mt-[60px] '>{/* putting overflow-hidden here will affect sticky property in FilterContainer*/}
            <Outlet />
        </main>
        <Footer />
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
    </div>
}
export default NavAndOutlet;