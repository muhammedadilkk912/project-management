import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../Redux/employeeSlice"
export const store=configureStore({
    reducer:{
        employees:employeeReducer
    }
})