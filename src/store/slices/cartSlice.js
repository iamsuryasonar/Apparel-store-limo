
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import CartServices from "../../services/cart.services";

export const getAllCartItems = createAsyncThunk(
    'cart/getAllCartItems',
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
    extraReducers : (builder) => {
        builder.addCase(addToCart.fulfilled, (state,action) => {
            state.cart.push(action.payload)
        })
        builder.addCase(addToCart.rejected,(state) => {
            state.cart = null
        })
        builder.addCase(getAllCartItems.fulfilled, (state,action)=>{
            state.cart = action.payload
        })
        builder.addCase(getAllCartItems.rejected, (state) => {
            state.cart = null
        })
    }

})

const {reducer, action} = cartSlice
export default reducer;