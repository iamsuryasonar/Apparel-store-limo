import React from 'react';
import Slider from "react-slick";
import useOnScreen from '../../../hooks/useOnScreen';
import CategoryCard from '../../../components/CategoryCard';
import CategoryShimmer from '../../../components/shimmers/CategoryShimmer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function CategorySection({ categories }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    return <section ref={ref} className={`w-full h-full px-4 -mt-[150px] self-start transition-all duration-700 delay-100 ${isVisible && categories ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        {categories && <div className="w-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map((category) => {
                return <CategoryCard key={category._id} category={category} />
            })}
        </div>}
        {/* <CategoryCarousel categories={categories} /> */}
        {
            !categories && <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <CategoryShimmer />
            </div>
        }
    </section>
}

export default CategorySection;

function CategoryCarousel({ categories }) {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 6 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 6,
            slidesToSlide: 6 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        }
    };

    return <>
        {
            categories && categories.length > 0 && <div className='flex flex-col'>
                <div className=''>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {
                            categories.map((category) => {
                                return <React.Fragment key={category._id}>
                                    <CategoryCard key={category._id} category={category} />
                                </React.Fragment>
                            })
                        }
                    </Carousel>
                </div>
            </div>
        }
    </>
}