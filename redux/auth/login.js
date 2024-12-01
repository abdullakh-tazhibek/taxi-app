import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/base";
import { setTokens } from "./tokenSlice";
import * as SecureStore from "expo-secure-store";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", credentials);
      const { token, refreshToken } = response.data;

      // Save tokens securely
      if (typeof window !== "undefined") {
        // For web environment (using localStorage)
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        // For React Native (using SecureStore)
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("refreshToken", refreshToken);
      }

      // Update token state
      dispatch(setTokens({ token, refreshToken }));

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const initialState = {
  country: "KZ",
  phone: "",
  password: "",
  isLoaded: false,
  errorMessage: "",
};

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCountry(state, action) {
      state.country = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoaded = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoaded = true;
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoaded = false;
        state.errorMessage = action.payload || "Login failed.";
      });
  },
});

export const { setCountry, setPhone, setPassword } = login.actions;

export default login.reducer;
