import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from './ProductCard';

function ProductCarousel({ products }) {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    const containerRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [swipeType, setSwipeType] = useState('');


    // carousal handlers
    const nextProductHandler = () => {
        if (currentProductIndex < products.length - 1) {
            setCurrentProductIndex(currentProductIndex + 1);
        }
    }

    const prevProductHandler = () => {
        if (currentProductIndex > 0) {
            setCurrentProductIndex(currentProductIndex - 1);
        }
    }

    //swipe handlers
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (startX === null) return;
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        if (diffX > 0) {
            setSwipeType('RIGHT')
        } else if (diffX < 0) {
            setSwipeType('LEFT')
        }
    };

    const handleTouchEnd = (e) => {
        setStartX(null);
        if (swipeType === 'RIGHT') {
            prevProductHandler()
        } else if (swipeType === 'LEFT') {
            nextProductHandler()
        }
        setSwipeType('');
    };

    return <>
        <div className='w-full h-full flex relative overflow-hidden'
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {products?.map((product, index) => {
                return <div style={{ translate: `${-100 * currentProductIndex}%`, transition: 'translate 300ms ease-in-out' }} className={`w-full h-full shrink-0 grow-0 flex items-center justify-center`}>
                    <ProductCard key={index} product={product} index={index} arr={products} />
                </div>
            })}
            <button className=' active:text-teal-500 text-white text-3xl w-8 h-8 absolute top-1/2 bottom-1/2 left-1 -translate-y-1/2 flex items-center justify-center'
                onClick={prevProductHandler}
            >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>
            <button className=' active:text-teal-500 text-white text-3xl w-8 h-8 absolute top-1/2 bottom-1/2 right-1 -translate-y-1/2 flex items-center justify-center'
                onClick={nextProductHandler}
            >
                <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>
        </div>
        <div className='w-full flex flex-row gap-2 mt-2 justify-end'>
            {products?.map((product, index) => {
                return <div key={index} className={`w-3 h-3  border-2 border-black rounded-full ${currentProductIndex === index ? 'bg-black' : 'bg-white'}`}
                    onClick={() => {
                        setCurrentProductIndex(index)
                    }}
                />
            })}
        </div>
    </>
}

export default ProductCarousel;