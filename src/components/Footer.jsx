import FollowUsSection from './FollowUsSection'
import HelpAndInformationSection from './HelpAndInformationSection'
import ServicesSection from './ServicesSection'

function Footer() {
    return <footer className="max-w-7xl m-auto py-10 flex flex-col gap-5 items-center justify-center px-10 bg-slate-100 " >
        <ServicesSection />
        <HelpAndInformationSection />
        <FollowUsSection />
        <p>© LIMO STORE 2024</p>
    </footer >
}
export default Footer;