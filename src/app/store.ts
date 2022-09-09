import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import citiesReducer from '../citiesSlice';
import {persistReducer, persistStore} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const persistedReducer = persistReducer(persistConfig, citiesReducer)

export const store = configureStore({
  reducer: {
    persistedReducer
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
