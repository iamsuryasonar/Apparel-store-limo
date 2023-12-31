import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import loadingReducer from "./slices/loadingSlice";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    loading: loadingReducer,
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});