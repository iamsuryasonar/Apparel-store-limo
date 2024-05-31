import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/slices/categorySlice'
import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import BannerSection from './components/BannerSection'
import ProductsByTagsSection from './components/ProductsByTagsSection'
import CategorySection from './components/CategorySection'
import useScrollToTop from '../../hooks/useScrollToTop'
import HomeShimmer from '../../components/shimmers/HomeShimmer'

function HomePage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(get_categories());
    }, [])

    useEffect(() => {
        const handleLoad = () => {
            setLoaded(true)
        }

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    useScrollToTop()

    return (
        <>
            <main className="max-w-7xl min-h-svh flex flex-col gap-8 items-center w-full h-full">
                <div
                    style={{ display: loaded ? "flex" : "none" }}
                    className='flex flex-col gap-8 items-center'>
                    {/* Todo: this banner should be a carousal featuring various categories and sections */}
                    <BannerSection />
                    <CategorySection categories={categories} />
                    {/*Todo:  mens section and womens sections, reuse product with filter component */}
                    <ProductsByTagsSection />
                    {
                        categories && <>
                            <InstagramWrapper />
                            <Subscribe />
                        </>
                    }
                </div>
                <HomeShimmer loaded={loaded} />
            </main >
        </>
    )
}

export default HomePage;


