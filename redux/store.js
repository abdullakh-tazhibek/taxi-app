import { configureStore } from "@reduxjs/toolkit";
import driverList from "./passenger/driverList";
import createPass from "./passenger/createPass";
import deliveryPass from "./passenger/deliveryPass";

import createDriver from "./driver/createDriver";
import passList from "./driver/passList";
import deliveryDriver from "./driver/deliveryDriver";

export const store = configureStore({
  reducer: {
    driverList,
    createPass,
    deliveryPass,

    passList,
    createDriver,
    deliveryDriver,
  },
});
