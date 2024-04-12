import React from 'react';
import useOnScreen from '../../../hooks/useOnScreen'
import CategoryCard from '../../../components/CategoryCard'
import CategoryShimmer from '../../../components/shimmers/CategoryShimmer'

function CategorySection({ categories }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    return <section ref={ref} className={`w-full h-full px-6 transition-all duration-700 delay-100 ${isVisible && categories ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        {categories && <div className="w-full h-full gap-8 grid grid-cols-[repeat(auto-fill,minmax(220px,max-content))] justify-center sm-jsutify-start">
            {categories.map((category) => {
                return <CategoryCard key={category._id} category={category} />
            })}
        </div>}
        {!categories && <CategoryShimmer />}
    </section>
}

export default CategorySection