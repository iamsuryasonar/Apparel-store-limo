import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import ProductsService from '../../services/products.services';

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await ProductsService.getProducts();
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
    products: null,
};

const productSlice = createSlice({
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
            })
            .addCase(get_products_by_category_id.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(get_products_by_category_id.rejected, (state, action) => {
                state.products = null;
            }).addCase(get_more_products_by_category_id.fulfilled, (state, action) => {
                state.products.products.push(...action.payload.products)
                state.products.pagination = action.payload.pagination;
            })
            .addCase(get_more_products_by_category_id.rejected, (state, action) => {
            })
    },
});

const { reducer, actions } = productSlice;
export const { clearProducts } = actions;
export default reducer;
