import React from 'react'

function Button({ className, onClick, children }) {
    return (
        <button onClick={onClick} className={`py-1 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#78B3CE] transition-colors duration-300 bg-opacity-70 backdrop-blur-md self-end ${className}`}>{children}</button>
    )
}

export default Button