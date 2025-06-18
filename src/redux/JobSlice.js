import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singleJobById: [],
    searchText: "",
    apply: false,
    adminJobs: [],
    searchAdminJobsBytext: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    setAlljobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJobById: (state, action) => {
      state.singleJobById = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setApply: (state, action) => {
      state.apply = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setSearchAdminJobsByText: (state, action) => {
      state.searchAdminJobsBytext = action.payload;
    },
    setAllApliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});
export const {
  setAlljobs,
  setSingleJobById,
  setSearchText,
  setApply,
  setAdminJobs,
  setSearchAdminJobsByText,
  setAllApliedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
