import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

const employeeSlice=createSlice({
    name:"employees",
    initialState,
    reducers:{
         addEmployee: (state, action) => {
      const newEmployee = {
        id: uuidv4(),
        ...action.payload,
      };
      state.employees.push(newEmployee);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
     updateEmployee: (state, action) => {
      // conso
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      console.log("index",index)
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    }
});
export const {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;