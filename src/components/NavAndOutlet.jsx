import { Outlet } from 'react-router-dom'
import Nav from './Nav';
import Footer from '../components/Footer'

function NavAndOutlet() {
    return <div className='relative bg-slate-50'>
        <Nav />
        <main className='flex mx-auto mt-[5rem] min-h-screen w-full justify-center'>{/* overflow-hidden here might affect sticky property in FilterContainer*/}
            <Outlet />
        </main>
        <Footer />
    </div>
}
export default NavAndOutlet;