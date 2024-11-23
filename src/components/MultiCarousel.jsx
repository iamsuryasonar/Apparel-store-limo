import React, { useRef, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function MultiCarousel({ data, renderSlide, maxitems = 6 }) {

    const [isNavigationDisabled, setIsNavigationDisabled] = useState([true, false]);
    const swiperRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!swiperRef.current && swiperRef.current.swiper.isBeginning) return;
        swiperRef.current.swiper.slidePrev();
        setIsNavigationDisabled([swiperRef.current.swiper.isBeginning, swiperRef.current.swiper.isEnd])
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current && swiperRef.current.swiper.isEnd) return;
        swiperRef.current.swiper.slideNext();
        setIsNavigationDisabled([swiperRef.current.swiper.isBeginning, swiperRef.current.swiper.isEnd])
    }, []);

    if (!data || data.length === 0) return null;

    return <>
        {
            <div className='relative'>
                <Swiper
                    ref={swiperRef}
                    slidesPerView={2}
                    spaceBetween={10}
                    modules={[Navigation]}
                    breakpoints={{
                        520: { slidesPerView: 3, spaceBetween: 10 },
                        768: { slidesPerView: 4, spaceBetween: 15 },
                        1024: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                >
                    {data.slice(0, maxitems).map((item, index, arr) => {
                        return <SwiperSlide key={index}>
                            {renderSlide(item, index, arr)}
                        </SwiperSlide>
                    })}
                </Swiper>

                <button className="absolute top-1/2 left-3 z-10 -translate-y-1/2 w-[40px] aspect-square bg-white opacity-90 rounded-full flex justify-center items-center disabled:opacity-20"
                    disabled={isNavigationDisabled[0]}
                    onClick={handlePrev} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 8 15" className=" " stroke="none"
                        style={
                            {
                                height: '15px',
                                width: '10px',
                            }}
                    ><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 13.5-6-6 6-6"></path></svg>
                </button>
                <button className="absolute top-1/2 right-3 z-10 -translate-y-1/2 w-[40px] aspect-square bg-white opacity-90 rounded-full flex justify-center items-center disabled:opacity-20"
                    disabled={isNavigationDisabled[1]}
                    onClick={handleNext}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 8 15" className=" " stroke="none"
                        style={
                            {
                                height: '15px',
                                width: '10px',
                            }}
                    ><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1.5 6 6-6 6"></path></svg>
                </button>
            </div>
        }
    </>
}

export default MultiCarousel;