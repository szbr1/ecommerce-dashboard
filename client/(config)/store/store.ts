'use client';
import { configureStore } from '@reduxjs/toolkit';
import { stateReducer } from './states';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '../api/api';

const configStore = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(configStore, stateReducer);

export const makeStore = () => {
  return configureStore({
    reducer: { persistedReducer, [api.reducerPath]: api.reducer },
    middleware: GetDefaultMiddleware => {
      return GetDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware);
    },
  });
};

// TYPES FOR STATES
export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
