import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/base";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/user/register");
      if (res.status !== 200) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  country: "KZ",
  phone: "",
  password: "",
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
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoaded = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoaded = false;
      });
  },
});

export const { setCountry, setPhone, setPassword } = login.actions;

export default login.reducer;
