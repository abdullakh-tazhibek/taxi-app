import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../src/api/base";

export const getDriverOrder = createAsyncThunk(
  "myOrders/getDriverOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/createdriver/:userId");
      if (res.status !== 200) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDriverOrder = createAsyncThunk(
  "myOrders/deleteDriverOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/createdriver/:userId");
      if (res.status !== 200) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPassOrder = createAsyncThunk(
  "myOrders/getPassOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/createpass/:userId");
      if (res.status !== 200) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePassOrder = createAsyncThunk(
  "myOrders/deletePassOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/createpass/:userId");
      if (res.status !== 200) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDeliveryOrder = createAsyncThunk(
  "myOrders/getDeliveryOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/deliverypass/:userId");
      if (res.status !== 200) {
        throw new Error("Сұраныста қателік бар!");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDeliveryOrder = createAsyncThunk(
  "myOrders/deleteDeliveryOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/deliverypass/:userId");
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
  driverOrder: [],
  passOrder: [],
  deliveryOrder: [],
  isLoaded: false,
};

export const myOrders = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    setDriverOrder(state, action) {
      state.driverOrder = action.payload;
    },
    setPassOrder(state, action) {
      state.passOrder = action.payload;
    },
    setDeliveryOrder(state, action) {
      state.deliveryOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDriverOrder.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getDriverOrder.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.driverOrder = action.payload;
      })
      .addCase(getDriverOrder.rejected, (state) => {
        state.isLoaded = false;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPassOrder.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getPassOrder.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.passOrder = action.payload;
      })
      .addCase(getPassOrder.rejected, (state) => {
        state.isLoaded = false;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryOrder.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getDeliveryOrder.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.deliveryOrder = action.payload;
      })
      .addCase(getDeliveryOrder.rejected, (state) => {
        state.isLoaded = false;
      });
  },
});

export const { setDriverOrder, setPassOrder, setDeliveryOrder } =
  myOrders.actions;

export default myOrders.reducer;
