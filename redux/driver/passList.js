import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/base";

export const getPassList = createAsyncThunk(
  "createpass/getPassList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/createpass");
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
  passList: [],
  isLoaded: false,
  fullData: [],
  searchQuery: "",
  error: null,
  modalVisible: false,
  selectedItem: null,
};

export const passList = createSlice({
  name: "passList",
  initialState,
  reducers: {
    setPassList(state, action) {
      state.passList = action.payload;
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
      .addCase(getPassList.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getPassList.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.passList = action.payload;
        state.fullData = action.payload;
      })
      .addCase(getPassList.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.payload;
      });
  },
});

export const { setPassList, setSearchQuery, openModal, closeModal } =
  passList.actions;

export default passList.reducer;
