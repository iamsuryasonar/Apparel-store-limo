import React, { useEffect, useRef, useState } from 'react';

const LazyLoadImage = ({ className = '', src, alt = '', onLoad = () => { } }) => {
    const imageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '500px'
        });

        observer.observe(imageRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <img
            className={className}
            ref={imageRef}
            src={isVisible ? src : ''}
            alt={alt}
            onLoad={onLoad}
        />
    );
};

export default LazyLoadImage;