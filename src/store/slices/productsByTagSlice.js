import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import ProductsService from "../../services/products.services";

export const get_products_by_tag = createAsyncThunk(
    'product/get_products_by_tag',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            thunkAPI.dispatch(clearProducts());
            let response = await ProductsService.getProductsByTag(data);
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

export const get_more_products_by_tag = createAsyncThunk(
    'product/get_more_products_by_tag',
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await ProductsService.getProductsByTag(data);
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
