import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/slices/categorySlice'
import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import BottomAlert from '../../components/BottomAlert'
import BannerSection from './components/BannerSection'
import OurProductsSection from './components/OurProductsSection'
import CategorySection from './components/CategorySection'
import useScrollToTop from '../../hooks/useScrollToTop'
 
function HomePage() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message.message);
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(get_categories());
    }, [])

    useScrollToTop()

    return (
        <main className="max-w-7xl min-h-svh flex flex-col gap-8 items-center w-full h-full">
            <BannerSection />
            <CategorySection categories={categories} />
            {
                categories && <>
                    <OurProductsSection categories={categories} />
                    <InstagramWrapper />
                    <Subscribe />
                </>
            }
            {message && <BottomAlert message={message} />}
        </main>
    )
}

export default HomePage;



