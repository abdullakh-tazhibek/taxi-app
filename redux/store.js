import { configureStore } from "@reduxjs/toolkit";

import login from "./auth/login";
import register from "./auth/register";

import driverList from "./passenger/driverList";
import createPass from "./passenger/createPass";
import deliveryPass from "./passenger/deliveryPass";

import createDriver from "./driver/createDriver";
import passList from "./driver/passList";
import deliveryDriver from "./driver/deliveryDriver";

import myOrders from "./myOrders";

export const store = configureStore({
  reducer: {
    login,
    register,

    driverList,
    createPass,
    deliveryPass,

    passList,
    createDriver,
    deliveryDriver,

    myOrders,
  },
});
