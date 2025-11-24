import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [], // All projects
    selectedProject: null, // Currently selected project
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        }
    },
});

export const { setProjects, setSelectedProject } = projectSlice.actions;

// Selector to get project by _id
export const selectProjectById = (state, projectId) =>
    state.projects.projects.find((project) => project._id === projectId);

export default projectSlice.reducer;