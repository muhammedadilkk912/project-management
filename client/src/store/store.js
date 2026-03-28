import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../Redux/employeeSlice"
import projectReducer  from '../Redux/projectSlice'
import taskReducer from '../Redux/taskSlice'
export const store=configureStore({
    reducer:{
        employees:employeeReducer,
        projects:projectReducer,
        tasks:taskReducer
    }
})