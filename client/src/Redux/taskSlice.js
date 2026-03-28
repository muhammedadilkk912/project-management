import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log("inside the addd tasks")
      state.tasks.push({
        id: uuidv4(),
        status: "todo",
        ...action.payload,
      });
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (t) => t.id !== action.payload
      );
    },
  },
});

export const { addTask, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;