import React from 'react'

function ButtonBnW({ className, dark = true, onClick, children }) {
    if (dark) {
        return (
            <button className={`border-[1px]  bg-black/70 text-white hover:bg-black rounded-full w-full p-1 text-center ${className}`} onClick={onClick}>{children}</button>
        )
    } else {
        return (
            <button className={`border-[1px] border-black hover:bg-black hover:text-white rounded-full w-full p-1 text-center ${className}`} onClick={onClick}>{children}</button>
        )
    }

}

export default ButtonBnW;