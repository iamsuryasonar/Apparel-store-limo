import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { initialiseUser } from '../../store/slices/authSlice';
import { LOCAL_STORAGE_NAME } from '../../constants/constant'

const PrivateRoute = ({ userData }) => {

    const dispatch = useDispatch()
    const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;
    const isAuthenticated = useMemo(() => {
        return (userData, accessToken) => {
            return userData && accessToken;
        };
    }, []);

    useEffect(() => {
        if (!isAuthenticated(userData, accessToken)) {
            dispatch(initialiseUser());
        }
    }, [dispatch, userData, accessToken, isAuthenticated]);

    return isAuthenticated(userData, accessToken) ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" />
    )

}

export default PrivateRoute;