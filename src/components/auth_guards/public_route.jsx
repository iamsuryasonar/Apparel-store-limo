import { useMemo } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOCAL_STORAGE_NAME } from '../../constants/constant';

const PublicRoute = ({ userData, children }) => {
    const dispatch = useDispatch()
    const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;

    const isAuthenticated = useMemo(() => {
        return (userData, accessToken) => {
            return userData && accessToken;
        };
    }, []);

    return isAuthenticated(userData, accessToken) ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    )

}

export default PublicRoute;