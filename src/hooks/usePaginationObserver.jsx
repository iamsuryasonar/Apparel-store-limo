import { useEffect, useRef } from 'react';

function usePaginationObserver(isTotalPagesFetched, callback) {
    const observer = useRef(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (isTotalPagesFetched) {
                    /* if total pages retrieved, disconnect the obeserver and return */
                    observer.current.disconnect();
                    return;
                }

                callback();

                observer.current.disconnect();
            }
        }, {
            rootMargin: '200px',
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
    }, [isTotalPagesFetched]);
}

export default usePaginationObserver;
