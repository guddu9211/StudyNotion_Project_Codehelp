import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState: initialState,
    reducers: {
        setCourseSectionData(state, value) {
            state.courseSectionData = value.payload
        },
        setCourseEntireData(state, value) {
            state.courseEntireData = value.payload
        },
        setCompletedLectures(state, value) {
            state.completedLectures = value.payload
        },
        setTotalNoOfLectures(state, value) {
            state.totalNoOfLectures = value.payload
        },
        updateCompletedLectures: (state, value) => {
            state.completedLectures = [...state.completedLectures, value.payload]
        }
    },
})

export const {
    setCourseEntireData,
    setCourseSectionData,
    setCompletedLectures,
    setTotalNoOfLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer