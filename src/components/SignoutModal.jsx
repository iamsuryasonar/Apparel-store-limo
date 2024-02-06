import React, { useEffect } from 'react';

const SignoutModal = ({ isOpen, onClose, confirmLogout }) => {
    
    return (
        <>
        < div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`} onClick={onClose}>
            {/* stopPropagation to ensure that clicking inside the modal content doesn't close the modal. */}
            <div className="bg-white p-8 rounded-md shadow-md" onClick={e => e.stopPropagation()}>
                <p className="text-lg mb-4">Are you sure you want to log out?</p>
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-2" onClick={confirmLogout}>Logout</button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={onClose}>Cancel</button>
                </div>
            </div>
            
        </div>
        </>
    );
}

export default SignoutModal;
