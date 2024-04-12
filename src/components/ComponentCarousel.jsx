import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleChevronLeft,
    faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function ComponentCarousel({ className, style, items, Child }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const containerRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [swipeType, setSwipeType] = useState("");
    const nextImageHandler = () => {
        if (items.length - 1 > currentImageIndex) {
            let t = (currentImageIndex + 1) * 100;
            containerRef.current.style.transform = `translateX(-${t}%)`;
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const prevImageHandler = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
            let t = (currentImageIndex - 1) * 100
            containerRef.current.style.transform = `translateX(-${t}%)`;
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

    const jumpToHandler = (index) => {
        if (index < currentImageIndex) {
            prevImageHandler()
        }

        if (index > currentImageIndex) {
            nextImageHandler()
        }
    }

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
                className="text-white bg-transparent w-6 h-6 absolute top-1/2 bottom-1/2 left-[5px] -translate-y-1/2"
                onClick={prevImageHandler}
                icon={faCircleChevronLeft}
            />
            <FontAwesomeIcon
                className="text-white bg-transparent w-6 h-6 absolute top-1/2 bottom-1/2 right-[5px] -translate-y-1/2"
                onClick={nextImageHandler}
                icon={faCircleChevronRight}
            />
            <div className='absolute bottom-[4px] right-0 left-0 flex justify-center gap-4'>
                {items.map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={`w-[18px] h-[6px] rounded-md cursor-pointer ${currentImageIndex === index ? 'bg-green-400' : 'bg-transparent'}`}
                            style={{
                                boxShadow: "1px 1px 2px rgba(0,0,0,.3)",
                            }}
                            onClick={() => {
                                jumpToHandler(index);
                            }}
                        ></div>
                    );
                })}
            </div>
        </div >
    );
}

export default ComponentCarousel;
