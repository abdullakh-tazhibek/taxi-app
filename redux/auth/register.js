import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/base";
import { setTokens } from "./tokenSlice";
import * as SecureStore from "expo-secure-store";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", userData);
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
      console.error("Registration failed:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const initialState = {
  role: "",
  country: "KZ",
  name: "",
  phone: "",
  email: "",
  password: "",
  cpass: "",
  isLoaded: false,
  successMessage: null,
};

export const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRole(state, action) {
      console.log("debug render set role: ", action.payload);
      state.role = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setCpass(state, action) {
      state.cpass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoaded = false;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.successMessage =
          action.payload.message || "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoaded = true;
        console.error("Registration error:", action.payload);
      });
  },
});

export const {
  setRole,
  setCountry,
  setName,
  setPhone,
  setEmail,
  setPassword,
  setCpass,
} = register.actions;

export default register.reducer;
