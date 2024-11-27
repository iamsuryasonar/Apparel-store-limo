import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useOnScreen from '../../../hooks/useOnScreen';
import CategoryCard from '../../../components/CategoryCard';
import { get_categories } from '../../../store/slices/categorySlice';
import CategoryShimmer from '../../../components/shimmers/CategoryShimmer';


function CategorySection() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    useEffect(() => {
        dispatch(get_categories());
    }, [])

    return <section ref={ref} className={`w-full h-full px-2 self-start transition-all duration-700 delay-100 ${isVisible && categories ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        <p className="mt-8 mb-3 text-[#78B3CE] text-xl lg:text-2xl font-bold uppercase">Find by category</p>
        {categories && <ul className="list-none w-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {categories.map((category) => {
                return <CategoryCard key={category._id} category={category} />
            })}
        </ul>}
        {
            !categories && <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <CategoryShimmer />
            </div>
        }
    </section>
}

export default CategorySection;