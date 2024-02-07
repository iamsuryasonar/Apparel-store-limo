import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import CategoriesService from '../../services/categories.services';

export const get_categories = createAsyncThunk(
    'categories/get_categories',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            let response = await CategoriesService.getCategories();
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
    categories: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(get_categories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(get_categories.rejected, (state, action) => {
                state.categories = null;
            })

    },
});

const { reducer } = categorySlice;
export default reducer;
