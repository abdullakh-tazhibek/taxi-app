import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/base";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/register", userData);

      if (res.status !== 201) {
        throw new Error(res.data.message || "Сұраныста қателік бар!");
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoaded = true;
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
