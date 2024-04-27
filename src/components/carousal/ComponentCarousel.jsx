import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleChevronLeft,
    faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function ComponentCarousel({ className, style, items, Child, timer }) {
    const [currentComponentIndex, setcurrentComponentIndex] = useState(0);
    const containerRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [swipeType, setSwipeType] = useState("");
    const [carousalDirection, setCarousalDirection] = useState(true); //true means incrementing component index

    const nextImageHandler = () => {
        if (items.length - 1 > currentComponentIndex) {
            let t;
            if (items.length - 2 === currentComponentIndex) { // last card should be traslated to by 88%
                t = (currentComponentIndex + 1) * 88;
            } else {
                t = (currentComponentIndex + 1) * 100;
            }

            containerRef.current.style.transform = `translateX(-${t}%)`;
            setcurrentComponentIndex(prev => prev + 1);
        }
        if (items.length - 1 === currentComponentIndex) {
            setCarousalDirection(false)
        }
    };

    const prevImageHandler = () => {
        if (currentComponentIndex > 0) {
            setcurrentComponentIndex(prev => prev - 1);
            let t = (currentComponentIndex - 1) * 100
            containerRef.current.style.transform = `translateX(-${t}%)`;
        }
        if (0 === currentComponentIndex) {
            setCarousalDirection(true)
        }
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (startX === null) return;
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        if (diffX > 0) {
            setSwipeType("RIGHT");
        } else if (diffX < 0) {
            setSwipeType("LEFT");
        }
    };

    const handleTouchEnd = (e) => {
        setStartX(null);
        if (swipeType === "RIGHT") {
            prevImageHandler();
        } else if (swipeType === "LEFT") {
            nextImageHandler();
        }
        setSwipeType("");
    };

    // const jumpToHandler = (index) => {
    //     if (index < currentComponentIndex) {
    //         prevImageHandler()
    //     }

    //     if (index > currentComponentIndex) {
    //         nextImageHandler()
    //     }
    // }

    useEffect(() => {
        const id = setInterval(() => {
            if (carousalDirection) {
                nextImageHandler()
            } else {
                prevImageHandler()
            }
        }, timer);

        return () => clearInterval(id);
    })

    return (
        <div className="w-full h-full relative overflow-hidden">
            <div
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ ...style }}
                className={className}
            >
                {items?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full h-full p-[20px]"
                            style={{
                                flexShrink: 0,
                                flexGrow: 0,
                            }}>
                            <Child product={item} index={index} arr={items} />
                        </div>
                    );
                })}
            </div>
            <FontAwesomeIcon
                className="text-green-400 bg-transparent w-6 h-6 absolute top-1/2 bottom-1/2 left-[4px] -translate-y-1/2"
                onClick={prevImageHandler}
                icon={faCircleChevronLeft}
            />
            <FontAwesomeIcon
                className="text-green-400 bg-transparent w-6 h-6 absolute top-1/2 bottom-1/2 right-[4px] -translate-y-1/2"
                onClick={nextImageHandler}
                icon={faCircleChevronRight}
            />
            <div className='absolute self-center rounded-md w-fit bottom-[4px] right-1/2 left-1/2 -translate-x-1/2 flex justify-center gap-0'
                style={{
                    boxShadow: "1px 1px 2px rgba(0,0,0,.3)",
                }}
            >
                {items.map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={`w-[18px] h-[6px] rounded-md cursor-pointer ${currentComponentIndex === index ? 'bg-green-400' : 'bg-transparent'}`}

                        // onClick={() => {
                        //     jumpToHandler(index);
                        // }}
                        ></div>
                    );
                })}
            </div>
        </div >
    );
}

export default ComponentCarousel;
