import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.isLoading = value.payload;
    },
  },
});

export const {setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;