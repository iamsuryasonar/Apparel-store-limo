import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import CartServices from "../../services/cart.services";

export const get_all_cart_items = createAsyncThunk(
    'cart/get_all_cart_items',
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
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            console.log(data);
            let response = await CartServices.addToCart(data);
            thunkAPI.dispatch(get_all_cart_items());
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


export const update_item_quantity = createAsyncThunk(
    'cart/update_item_quantity',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await CartServices.UpdateItemQuantity(data);
            thunkAPI.dispatch(get_all_cart_items());
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


export const remove_item_from_cart = createAsyncThunk(
    'cart/remove_item_from_cart',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await CartServices.RemoveItemFromCart(data);
            thunkAPI.dispatch(get_all_cart_items());
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
    cart: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_all_cart_items.fulfilled, (state, action) => {
                    state.cart = action.payload;
                }).addCase(get_all_cart_items.rejected, (state, action) => {
                })
        },
})

const { reducer } = cartSlice;
export default reducer;