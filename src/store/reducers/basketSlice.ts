import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBasket } from "../../types/basket.types";
import { IAsteroid } from "../../types/asteroids.types";

const initialState: IBasket = {
  count: 0,
  asteroids: [],
  isSend: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, actions: PayloadAction<IAsteroid>) => {
      const index = state.asteroids.findIndex(
        asteroid => asteroid.id === actions.payload.id
      );

      if (index === -1) {
        state.count++;
        state.asteroids.push(actions.payload);
      } else {
        state.count--;
        state.asteroids.splice(index, 1);
      }
    },
    resetBasket: (state) => {
      state.count = 0;
      state.asteroids = [];
    },
    setIsSend: (state) => {
      state.isSend = !state.isSend;
    }
  },
});

export const { actions, reducer } = basketSlice;
