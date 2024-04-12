import { useState, useEffect } from "react";

function useScrollToTop(dependencies = []) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, dependencies);
}

export default useScrollToTop