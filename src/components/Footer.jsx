import FollowUsSection from './FollowUsSection'
import HelpAndInformationSection from './HelpAndInformationSection'
import ServicesSection from './ServicesSection'

function Footer() {
    return <footer className="w-full bg-slate-100 py-14 px-6" >
        <div className='max-w-7xl m-auto flex flex-col gap-5'>
            <ServicesSection />
            <HelpAndInformationSection />
            <FollowUsSection />
            <p>© LIMO STORE 2024</p>
        </div>
    </footer >
}
export default Footer;