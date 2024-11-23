import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/slices/categorySlice'
import Subscribe from "./components/Subscribe";
import InstagramWrapper from "./components/InstagramWrapper";
import ProductsByTagsSection from './components/ProductsByTagsSection'
import CategorySection from './components/CategorySection'
import useScrollToTop from '../../hooks/useScrollToTop'
import HeroSection from './components/HeroSection'
import AutoplaySlider from '../../components/AutoplaySlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SERVICES } from '../../utilities/constants';

function HomePage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(get_categories());
    }, [])

    useScrollToTop()

    function renderCard(id, item) {
        return <>
            <div key={id} className='w-[200px] sm:w-[300px] m-2 p-2 flex items-center gap-3 border-4 border-[#78b3ceb2]'>
                <FontAwesomeIcon icon={item.icon} className='text-2xl text-[#69aece]' />
                <div className='flex flex-col'>
                    <p className='text-nowrap font-bold'>{item.title}</p>
                    <p className='text-xs text-slate-500'>{item.description}</p>
                </div>
            </div>
        </>
    }

    return (
        <>
            <main className="w-full h-full max-w-6xl min-h-svh flex flex-col">
                <HeroSection />
                <AutoplaySlider renderProp={renderCard} items={SERVICES} speed={60} />
                <CategorySection categories={categories} />
                {/*Todo:  mens section and womens sections, reuse product with filter component */}
                <ProductsByTagsSection />
                {
                    categories && <>
                        <InstagramWrapper />
                        <Subscribe />
                    </>
                }
            </main >
        </>
    )
}

export default HomePage;


