import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'

const SignoutModal = ({ isLogoutModal, setIsLogoutModal }) => {
    const dispatch = useDispatch();
    /* to prevent body from scrolling while modal is active */
    useEffect(() => {
        if (isLogoutModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLogoutModal]);

    const confirmLogout = () => {
        setIsLogoutModal(false);
        dispatch(logout());
    }

    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isLogoutModal ? '' : 'hidden'}`} onClick={() => setIsLogoutModal(false)}>
                {/* stopPropagation to ensure that clicking inside the modal content doesn't close the modal*/}
                <div className="bg-white p-8 rounded-md shadow-md" onClick={e => e.stopPropagation()}>
                    <p className="text-lg mb-4">Are you sure you want to log out?</p>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-2" onClick={confirmLogout}>Logout</button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setIsLogoutModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignoutModal;
