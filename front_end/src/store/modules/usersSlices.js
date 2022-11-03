import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../services/axios/baseAPI";

export const userInfo = createAsyncThunk("myInfo", async () => {
  const { user: data } = await get(`myInfo`);
  return data;
});

const initialState = {
  loading: false,
  userData: {},
  accountUser: {},
};

const usersSlices = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getAccountUser: (state, action) => {
      state.accountUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    });
    builder.addCase(userInfo.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { getAccountUser } = usersSlices.actions;
export default usersSlices.reducer;
