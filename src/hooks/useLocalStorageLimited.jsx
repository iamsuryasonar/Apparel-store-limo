import { useState } from 'react';

const useLocalStorageLimited = (key, maxSize = 4) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    });

    const setValue = (value) => {
        let isPresent = storedValue.find(item => item._id === value._id) !== undefined
        let newValue = [...storedValue];

        if (!isPresent) {// product not already present in local storage
            newValue.push(value);
            if (newValue.length > maxSize) { // maximum recently viewed product should be less than maxSize
                newValue.shift();
            }
            setStoredValue(prev => [...newValue]);
            window.localStorage.setItem(key, JSON.stringify(newValue));
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorageLimited;
