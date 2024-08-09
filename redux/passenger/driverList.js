import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/base";

export const getDriverList = createAsyncThunk(
  "passenger-driverOrders/getDriverList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/createdriver");
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
  driverList: [],
  isLoaded: false,
  fullData: [],
  searchQuery: "",
  error: null,
  modalVisible: false,
  selectedItem: null,
};

export const driverList = createSlice({
  name: "driverList",
  initialState,
  reducers: {
    setDriverList(state, action) {
      state.driverList = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    openModal: (state, action) => {
      state.modalVisible = true;
      state.selectedItem = action.payload;
    },
    closeModal: (state) => {
      state.modalVisible = false;
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDriverList.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getDriverList.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.driverList = action.payload;
        state.fullData = action.payload;
      })
      .addCase(getDriverList.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.payload;
      });
  },
});

export const { setDriverList, setSearchQuery, openModal, closeModal } =
  driverList.actions;

export default driverList.reducer;
