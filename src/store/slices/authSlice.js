import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { LOCAL_STORAGE_NAME } from "../../constants/constant";
import AuthService from "../../services/auth.services";
import { setLoading } from "./loadingSlice";
import isValidToken from '../../constants/authUtil'

// const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
export const initialiseUser = createAsyncThunk(
  'auth/initialise',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;
      const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.userData;

      if (!accessToken) {
        return thunkAPI.rejectWithValue("Access token not available");
      }
      if (!isValidToken(accessToken)) {
        return thunkAPI.rejectWithValue("Invalid token");
      }
      return { userData, accessToken };

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

export const register = createAsyncThunk(
  "auth/register",
  async (creds, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await AuthService.register(creds);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
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
);

export const login = createAsyncThunk(
  "auth/login",
  async (creds, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await AuthService.login(creds);
      const data = {
        userData: {
          email: res.email,
        },
        accessToken: res.token,
      };
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
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
  });

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      await AuthService.logout();
      return;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
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
  });

const initialState = {
  userData: null,
  accessToken: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(initialiseUser.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(initialiseUser.rejected, (state, action) => {
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.userData = null;
        state.accessToken = null;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
