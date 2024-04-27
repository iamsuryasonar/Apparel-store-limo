import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/slices/categorySlice'
import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import BannerSection from './components/BannerSection'
import ProductsByTagsSection from './components/ProductsByTagsSection'
import CategorySection from './components/CategorySection'
import useScrollToTop from '../../hooks/useScrollToTop'

function HomePage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(get_categories());
    }, [])

    useScrollToTop()

    return (
        <main className="max-w-7xl min-h-svh flex flex-col gap-8 items-center w-full h-full">
            {/* Todo: this banner should be a carousal featuring various categories and sections */}
            <BannerSection />
            <CategorySection categories={categories} />
            <ProductsByTagsSection />
            {/*Todo:  mens section and womens sections, reuse product with filter component */}
            {
                categories && <>
                    <InstagramWrapper />
                    <Subscribe />
                </>
            }
        </main>
    )
}

export default HomePage;



