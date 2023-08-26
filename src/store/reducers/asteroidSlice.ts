import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface asteroidInfo {
  id: string;
}

const initialState: asteroidInfo = {
  id: "",
};

const asteroidSlice = createSlice({
  name: "asteroid",
  initialState,
  reducers: {
    setIdAsteroidInfo: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { actions, reducer } = asteroidSlice;
