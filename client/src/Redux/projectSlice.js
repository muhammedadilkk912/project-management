import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const initialState={
    projects:[]
}

const projectSlice=createSlice({
 name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
        console.log("inside the add project slice")
      state.projects.push({
        id: uuidv4(),
        ...action.payload,
      });
    },

    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (p) => p.id !== action.payload
      );
    },

    updateProject: (state, action) => {
      const index = state.projects.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
}
})

export const {addProject,deleteProject,updateProject}=projectSlice.actions
export default projectSlice.reducer