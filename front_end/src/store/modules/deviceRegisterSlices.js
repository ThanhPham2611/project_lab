import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../services/axios/baseAPI";

export const deviceRegister = createAsyncThunk(
  "deviceRegister",
  async (search) => {
    console.log(search);
    const { dataBorrow: data } = await get(`myListDevice`, search);
    return data;
  }
);

const initialState = {
  loading: false,
  listDeviceRegister: [],
};

const deviceRegisterSlices = createSlice({
  name: "deviceRegister",
  initialState,
  extraReducers: (builder) => {
    //deviceRegister
    builder.addCase(deviceRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deviceRegister.fulfilled, (state, action) => {
      state.listDeviceRegister = action.payload;
      state.loading = false;
    });
    builder.addCase(deviceRegister.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default deviceRegisterSlices.reducer;
