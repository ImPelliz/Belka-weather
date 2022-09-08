import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import citiesReducer from '../citiesSlice'

export const store = configureStore({
  reducer: {
    citiesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
