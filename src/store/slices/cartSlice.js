
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import CartServices from "../../services/cart.services";

export const get_all_cartitems = createAsyncThunk(
    'cart/get_all_cartitems',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await CartServices.getAllCartItems();
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await CartServices.addToCart();
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
)


const initialState = {
    cart : null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

})


export default cartSlice.reducer;