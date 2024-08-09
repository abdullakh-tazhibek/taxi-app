import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/base";

export const getDeliveryList = createAsyncThunk(
  "deliverypass/getDeliveryList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/deliverypass");
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
  deliveryList: [],
  isLoaded: false,
  fullData: [],
  searchQuery: "",
  error: null,
  modalVisible: false,
  selectedItem: null,
};

const deliveryDriver = createSlice({
  name: "deliveryDriver",
  initialState,
  reducers: {
    setDeliveryList(state, action) {
      state.deliveryList = action.payload;
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
      .addCase(getDeliveryList.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getDeliveryList.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.deliveryList = action.payload;
        state.fullData = action.payload;
      })
      .addCase(getDeliveryList.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.payload;
      });
  },
});

export const { setDeliveryList, setSearchQuery, openModal, closeModal } =
  deliveryDriver.actions;

export default deliveryDriver.reducer;
