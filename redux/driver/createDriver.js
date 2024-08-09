import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/base";

export const createOrder = createAsyncThunk(
  "createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const { driverData } = payload;
      const res = await axios.post("/createdriver", [driverData]);
      if (res.status !== 201) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  location1: "",
  filterLocation1: [],
  location2: "",
  filterLocation2: [],
  count: 1,
  date: new Date().toISOString(),
  comment: "",
  price: "",
  loading: false,
  error: null,
};

export const createDriver = createSlice({
  name: "createDriver",
  initialState,
  reducers: {
    setLocation1(state, action) {
      state.location1 = action.payload;
    },
    setFilterLocation1(state, action) {
      state.filterLocation1 = action.payload;
    },
    setLocation2(state, action) {
      state.location2 = action.payload;
    },
    setFilterLocation2(state, action) {
      state.filterLocation2 = action.payload;
    },
    setCount(state, action) {
      state.count = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming you want to store the created order data in the state
        // Modify as per your requirement
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLocation1,
  setFilterLocation1,
  setLocation2,
  setFilterLocation2,
  setCount,
  setDate,
  setComment,
  setPrice,
} = createDriver.actions;

export default createDriver.reducer;
