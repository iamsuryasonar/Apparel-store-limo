import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./loadingSlice";
import ProductsServices from "../../services/products.services";
import { toast } from 'react-toastify';

export const get_products_by_tag = createAsyncThunk(
    'product/get_products_by_tag',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            thunkAPI.dispatch(clearProducts());
            let response = await ProductsServices.getProductsByTag(data);
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

export const get_more_products_by_tag = createAsyncThunk(
    'product/get_more_products_by_tag',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await ProductsServices.getProductsByTag(data);
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
    productsByTag: null,
};

const productsByTagSlice = createSlice({
    name: "productsByTag",
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.productsByTag = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products_by_tag.fulfilled, (state, action) => {
                state.productsByTag = action.payload;
            })
            .addCase(get_products_by_tag.rejected, (state, action) => {
                state.productsByTag = null;
            }).addCase(get_more_products_by_tag.fulfilled, (state, action) => {
                state.productsByTag.products.push(...action.payload.products)
                state.productsByTag.pagination = action.payload.pagination;
            })
            .addCase(get_more_products_by_tag.rejected, (state, action) => {
            })
    },
});

const { reducer, actions } = productsByTagSlice;
export const { clearProducts } = actions;
export default reducer;
