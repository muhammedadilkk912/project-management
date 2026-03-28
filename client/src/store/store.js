import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../Redux/employeeSlice"
import projectReducer  from '../Redux/projectSlice'
export const store=configureStore({
    reducer:{
        employees:employeeReducer,
        projects:projectReducer
    }
})