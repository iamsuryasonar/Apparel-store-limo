import FollowUsSection from './FollowUsSection'
import HelpAndInformationSection from './HelpAndInformationSection'
import ServicesSection from './ServicesSection'

function Footer() {
    return <footer className="w-full py-10 px-6 flex flex-col justify-start bg-slate-100 " >
        <div className='max-w-7xl flex flex-col gap-5'>
            <ServicesSection />
            <HelpAndInformationSection />
            <FollowUsSection />
            <p>© LIMO STORE 2024</p>
        </div>
    </footer >
}
export default Footer;