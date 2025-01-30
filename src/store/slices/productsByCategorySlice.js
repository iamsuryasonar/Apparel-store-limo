import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./loadingSlice";
import ProductsService from "../../services/products.services";
import { toast } from 'react-toastify';

export const get_products_by_category_id = createAsyncThunk(
    'product/get_products_by_category_id',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            thunkAPI.dispatch(clearProducts());
            let response = await ProductsService.getProductsByCategoryId(data);
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

export const get_more_products_by_category_id = createAsyncThunk(
    'product/get_more_products_by_category_id',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await ProductsService.getProductsByCategoryId(data);
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
    productsByCategory: null,
};

const productsByCategorySlice = createSlice({
    name: "productsByCategory",
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.productsByCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products_by_category_id.fulfilled, (state, action) => {
                state.productsByCategory = action.payload;
            })
            .addCase(get_products_by_category_id.rejected, (state, action) => {
                state.productsByCategory = null;
            }).addCase(get_more_products_by_category_id.fulfilled, (state, action) => {
                state.productsByCategory.products.push(...action.payload.products)
                state.productsByCategory.pagination = action.payload.pagination;
            })
            .addCase(get_more_products_by_category_id.rejected, (state, action) => {
            })
    },
});

const { reducer, actions } = productsByCategorySlice;
export const { clearProducts } = actions;
export default reducer;
