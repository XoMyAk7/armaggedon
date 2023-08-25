import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface asteroidInfo {
  isInfo: boolean;
  id: string;
}

const initialState: asteroidInfo = {
  isInfo: false,
  id: "",
};

const asteroidSlice = createSlice({
  name: "asteroid",
  initialState,
  reducers: {
    setIsInfo: (state, action: PayloadAction<boolean>) => {
      state.isInfo = action.payload;
    },
    setIdAsteroidInfo: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { actions, reducer } = asteroidSlice;
