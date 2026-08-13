import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApi from '../../api/auth.api';
import { getErrorMessage } from '../../utils/errors';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApi.getMe();
      return user;
    } catch (error) {
      if (error.response?.status === 401) return null;
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.registerUser(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Registration failed.'));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.loginUser(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Login failed.'));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logoutUser();
      return null;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Logout failed.'));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeAuth.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload;
        state.isAuthenticated = Boolean(action.payload);
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = Boolean(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = Boolean(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
