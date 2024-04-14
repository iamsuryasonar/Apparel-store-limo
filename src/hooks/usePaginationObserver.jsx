import { useEffect, useRef } from 'react';

function usePaginationObserver(products, callback) {
    const observer = useRef(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (products?.pagination?.page_no >= products?.pagination?.total_pages) {
                    /* if total pages retrieved, disconnect the obeserver and return */
                    observer.current.disconnect();
                    return;
                }

                callback();

                observer.current.disconnect();
            }
        }, {
            rootMargin: '350px',
            threshold: 0.5,
        });

        const scrollContainer = document.querySelector('.scroll-container');

        if (scrollContainer) {
            /* observes the scroll-container className that is attached to the last third product card */
            observer.current.observe(scrollContainer);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [products]);
}

export default usePaginationObserver;
