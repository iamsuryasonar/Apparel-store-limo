import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./loadingSlice";
import productsService from '../../services/products.services';
import { toast } from 'react-toastify';

export const get_products = createAsyncThunk(
    'product/get_products',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            thunkAPI.dispatch(clearProducts());
            let response = await productsService.getProducts(data);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return thunkAPI.rejectWithValue();
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const get_more_products = createAsyncThunk(
    'product/get_more_products',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await productsService.getProducts(data);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return thunkAPI.rejectWithValue();
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

const initialState = {
    products: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.products = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(get_products.rejected, (state, action) => {
                state.products = null;
            }).addCase(get_more_products.fulfilled, (state, action) => {
                state.products.products.push(...action.payload.products)
                state.products.pagination = action.payload.pagination;
            })
            .addCase(get_more_products.rejected, (state, action) => {
            })
    },
});

const { reducer, actions } = productsSlice;
export const { clearProducts } = actions;
export default reducer;
