import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/slices/categorySlice'
import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import BottomAlert from '../../components/BottomAlert'
import BannerSection from './components/BannerSection'
import FollowUsSection from './components/FollowUsSection'
import HelpAndInformationSection from './components/HelpAndInformationSection'
import ServicesSection from './components/ServicesSection'
import NewArrivedProducts from './components/NewArrivedProducts'
import CategorySection from './components/CategorySection'

function HomePage() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message.message);
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(get_categories());
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <main className="max-w-7xl min-h-svh flex flex-col gap-8 items-center w-full h-full">
            <BannerSection />
            <CategorySection categories={categories} />
            {
                categories && <>
                    <NewArrivedProducts categories={categories} />
                    <InstagramWrapper />
                    <Subscribe />
                    <ServicesSection />
                    <HelpAndInformationSection />
                    <FollowUsSection />
                </>
            }
            {message && <BottomAlert message={message} />}
        </main>
    )
}

export default HomePage;



