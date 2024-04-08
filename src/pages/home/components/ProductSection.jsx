import useOnScreen from '../../../hooks/useOnScreen'
import CategoryCard from '../../../components/CategoryCard'
import CategoryShimmer from '../../../components/shimmers/CategoryShimmer'

function ProductSection({ categories }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    return <div ref={ref} className={`w-11/12 h-full transition-all duration-700 delay-100 ${isVisible && categories ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        {categories && <div className="w-full h-full gap-8 grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 justify-center">
            {categories?.map((category) => {
                return <CategoryCard key={category._id} category={category} />
            })}
            {!categories && <CategoryShimmer />}
        </div>}
    </div>
}

export default ProductSection