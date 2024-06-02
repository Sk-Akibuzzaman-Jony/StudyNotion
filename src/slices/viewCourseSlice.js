import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    viewCourse: null,
    viewSection: null,
    viewSubsection: null,
    viewCourseProgress : {},
};

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState: initialState,
    reducers: {
        setViewCourse(state, value) {
            state.viewCourse = value.payload;
        },
        setViewSection(state, value) {
            state.viewSection = value.payload;
        },
        setViewSubsection(state, value) {
            state.viewSubsection = value.payload;
        },
        setViewCourseProgress(state, value) {
            state.viewCourseProgress = value.payload;
        },
    },
});

export const { setViewCourse,  setViewSection, setViewSubsection, setViewCourseProgress} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;