import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isValidToken, getAccessToken, getUserData } from '../../utilities/utility'
import { LOCAL_STORAGE_NAME } from '../../utilities/constants'
import AuthService from "../../services/auth.services";
import { setLoading } from "./loadingSlice";
import { toast } from 'react-toastify';

export const initialiseUser = createAsyncThunk(
  'auth/initialise',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const accessToken = getAccessToken();
      const userData = getUserData();

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
      toast.error(message)
      return thunkAPI.rejectWithValue();
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await AuthService.register(credentials);
      toast.info(response.data.message)
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message)
      return thunkAPI.rejectWithValue();
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await AuthService.login(credentials);
      const data = {
        userData: {
          _id: res._id,
          firstName: res.firstName,
          lastName: res.lastName,
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
      toast.error(message)
      return thunkAPI.rejectWithValue();
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  });

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      AuthService.logout();
      return;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message)
      return thunkAPI.rejectWithValue();
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  });

const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

const initialState = user?.accessToken
  ? {
    isLoggedIn: true,
    userData: user.userData,
    accessToken: user.accessToken,
  }
  : {
    isLoggedIn: false,
    userData: null,
    accessToken: null,
  }

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(initialiseUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(initialiseUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.accessToken = null;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
