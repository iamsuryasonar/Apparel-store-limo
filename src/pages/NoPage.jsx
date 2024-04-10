import { Link } from 'react-router-dom'

function NoPage() {
    return <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-[9em] text-red-600 font-bold">
            <span className="animate-pulse">4</span>
            <span className="animate-pulse">0</span>
            <span className="animate-pulse">4</span>
        </p>
        <div className="flex flex-col gap-6">
            <p className="uppercase text-3xl font-bold">Page not found!</p>
            <Link to='/' className="uppercase font-bold text-xl border border-1 hover:text-white hover:bg-black px-6 py-1 text-center">Return to home</Link>
        </div>
    </div>
}

export default NoPage