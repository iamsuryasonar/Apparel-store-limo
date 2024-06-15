import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";


function ImageCarousel({ images }) {
    const containerRef = useRef(null);

    const [currentImage, setCurrentImage] = useState(0);
    const [loadedImages, setLoadedImages] = useState([]);
    const [startX, setStartX] = useState(null);
    const [swipeType, setSwipeType] = useState('');

    /* carousal handlers */
    const nextImageHandler = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0)
        }
    }

    const prevImageHandler = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        } else {
            setCurrentImage(images.length - 1)
        }
    }
    const handleImageLoad = (index) => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };

    /* swipe handlers */
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
            prevImageHandler()
        } else if (swipeType === 'LEFT') {
            nextImageHandler()
        }
        setSwipeType('');
    };

    return <>
        {
            <div ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd} className='w-full h-full flex relative overflow-hidden'>
                {images?.map((image, index) => {
                    return <img alt='product' key={image?.id} src={image?.url} style={{ translate: `${-100 * currentImage}%`, transition: 'translate 700ms ease-in-out' }} className={`shrink-0 grow-0  object-cover w-full h-full`} onLoad={() => handleImageLoad(index)} />
                })}
                <div className='absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2'>
                    {!loadedImages.includes(currentImage) ? <div className={`w-12 h-12 rounded-full animate-spin border-8 border-dashed border-t-transparent`}></div> : <></>}
                </div>
                <button className=' active:text-teal-500 text-black text-3xl w-8 h-8 absolute top-1/2 bottom-1/2 left-1 -translate-y-1/2 flex items-center justify-center'
                    onClick={prevImageHandler}
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <button className=' active:text-teal-500 text-black text-3xl w-8 h-8 absolute top-1/2 bottom-1/2 right-1 -translate-y-1/2 flex items-center justify-center'
                    onClick={nextImageHandler}
                >
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>
        }
        <div className='w-full flex flex-row gap-2 mt-4 justify-end'>
            {images.map((item, index) => {
                return <img alt='product' key={item._id} src={item.url} className={`w-1/6 object-cover aspect-square ${currentImage === index ? 'border-2 border-slate-500' : ''}`}
                    onClick={() => {
                        setCurrentImage(index)
                    }}
                />
            })}
        </div>
    </>
}

export default ImageCarousel;