import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { type ConfigureStoreOptions, combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import sharedReducer from './sharedSlice';
import { generatedCodeApi } from '../services/generatedCodeApi';

const rootPersistConfig = {
  key: 'appName',
  storage,
  blacklist: ['alertManager'],
};

const rootReducer = combineReducers({
  [generatedCodeApi.reducerPath]: generatedCodeApi.reducer,
  sharedReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(generatedCodeApi.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
