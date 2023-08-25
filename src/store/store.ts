import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as sizeReducer } from "./reducers/sizeSlice";
import { reducer as basketReducer } from "./reducers/basketSlice";
import { reducer as distanceReducer } from "./reducers/distanceSlice";
import { reducer as asteroidReducer } from "./reducers/asteroidSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  size: sizeReducer,
  basket: basketReducer,
  distance: distanceReducer,
  asteroid: asteroidReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
