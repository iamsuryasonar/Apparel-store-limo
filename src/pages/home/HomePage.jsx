import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import ProductsByTagsSection from './components/ProductsByTagsSection'
import CategorySection from './components/CategorySection'
import useScrollToTop from '../../hooks/useScrollToTop'
import HeroSection from './components/HeroSection'
import AutoPlayServicesSection from './components/AutoPlayServicesSection';

function HomePage() {

    useScrollToTop();

    return (
        <>
            <main className="w-full h-full max-w-6xl min-h-svh flex flex-col">
                <HeroSection />
                <AutoPlayServicesSection />
                <CategorySection />
                {/*Todo:  mens section and womens sections, reuse product with filter component */}
                <ProductsByTagsSection />
                <InstagramWrapper />
                <Subscribe />
            </main >
        </>
    )
}

export default HomePage;


