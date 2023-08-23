import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface sizeState {
  width: number;
  isDesktop: boolean;
}

const initialState: sizeState = {
  width: window.innerWidth,
  isDesktop: window.innerWidth > 991 ? true : false,
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
      if (state.width <= 991) {
        state.isDesktop = false;
      } else {
        state.isDesktop = true;
      }
    },
  },
});

export const { actions, reducer } = sizeSlice;
