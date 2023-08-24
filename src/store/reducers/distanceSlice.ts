import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDistance {
  inKm: boolean;
}

const initialState: IDistance = {
  inKm: true,
};

const basketSlice = createSlice({
  name: "distance",
  initialState,
  reducers: {
    setDistance: (state, actions: PayloadAction<boolean>) => {
      state.inKm = actions.payload;
    },
  },
});

export const { actions, reducer } = basketSlice;
