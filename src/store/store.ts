import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {reducer as sizeReducer} from "./reducers/sizeSlice"

const reducers = combineReducers({
  size: sizeReducer
})

const store = configureStore({
  reducer: reducers,
})

export default store
export type RootState = ReturnType<typeof store.getState>