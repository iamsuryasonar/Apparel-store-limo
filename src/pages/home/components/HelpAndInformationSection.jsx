import { Link } from 'react-router-dom';

function HelpAndInformationSection() {
    return <div className="w-full p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full  flex flex-col">
            <p className="font-bold">NEED HELP?</p>
            <Link className='hover:text-blue-400' to='/account'>Your Account</Link>
            <Link className='hover:text-blue-400' to='/contact-us'>Contact Us</Link>
            <Link className='hover:text-blue-400'>Returns, Refunds & Cancellations</Link>
        </div>
        <div className="w-full flex flex-col">
            <p className="font-bold">INFORMATION</p>
            <Link to='/terms-and-conditions' className='hover:text-blue-400'>Terms & Conditions</Link>
            <Link className='hover:text-blue-400'>Privacy Policy</Link>
        </div>
    </div>
}


export default HelpAndInformationSection
