import React from 'react';
import useOnScreen from '../../../hooks/useOnScreen';
import CategoryCard from '../../../components/CategoryCard';
import CategoryShimmer from '../../../components/shimmers/CategoryShimmer';

function CategorySection({ categories }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    return <section ref={ref} className={`w-full h-full -mt-[150px] self-start px-4 transition-all duration-700 delay-100 ${isVisible && categories ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        {categories && <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
                return <CategoryCard key={category._id} category={category} />
            })}
        </div>}
        {!categories && <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            <CategoryShimmer />
        </div>}
    </section>
}

export default CategorySection;