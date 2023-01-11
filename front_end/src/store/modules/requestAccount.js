import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../services/axios/baseAPI";

export const getRequestAccount = createAsyncThunk(
  "requestAccount",
  async (params) => {
    const { data } = await get("getRequestAccount", params);
    return data;
  }
);

const initialState = {
  loading: false,
  listRequestAccount: [],
};

const requestAccountSlices = createSlice({
  name: "requestAccount",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRequestAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRequestAccount.fulfilled, (state, action) => {
      state.listRequestAccount = action.payload;
      state.loading = false;
    });
    builder.addCase(getRequestAccount.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default requestAccountSlices.reducer;
