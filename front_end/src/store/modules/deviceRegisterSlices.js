import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../services/axios/baseAPI";

export const deviceRegister = createAsyncThunk(
  "deviceRegister",
  async (search) => {
    const { dataBorrow: data } = await get(`myListDevice`, search);
    return data;
  }
);

export const listRequestDevice = createAsyncThunk(
  "listRequestDevice",
  async (value) => {
    const { data } = await get(`request_device`, value);
    return data;
  }
);

export const getlistDevice = createAsyncThunk("listDevice", async (params) => {
  const { data } = await get(`getDevice`, params);
  return data;
});

export const getlistDeviceType = createAsyncThunk(
  "listDeviceType",
  async () => {
    const { data } = await get(`getDeviceSig`);
    return data;
  }
);

const initialState = {
  loading: false,
  listDeviceRegister: [],
  listRequest: [],
  listDevice: [],
  listDeviceType: [],
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
    //list request
    builder.addCase(listRequestDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listRequestDevice.fulfilled, (state, action) => {
      state.listRequest = action.payload;
      state.loading = false;
    });
    builder.addCase(listRequestDevice.rejected, (state) => {
      state.loading = false;
    });
    //list device
    builder.addCase(getlistDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getlistDevice.fulfilled, (state, action) => {
      state.listDevice = action.payload;
      state.loading = false;
    });
    builder.addCase(getlistDevice.rejected, (state) => {
      state.loading = false;
    });
    //list device type
    builder.addCase(getlistDeviceType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getlistDeviceType.fulfilled, (state, action) => {
      state.listDeviceType = action.payload;
      state.loading = false;
    });
    builder.addCase(getlistDeviceType.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default deviceRegisterSlices.reducer;
