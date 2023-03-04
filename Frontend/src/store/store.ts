import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import { baseApi } from './api/baseApi';
import todoApi from './api/todoApi';

import todoSlice from './slice/todoSlice';

const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
    todoApi.middleware
  ];

  return middlewareList;
};

const authPersistConfig = {
  key: 'todo',
  storage: storage,
  blacklist: ['todoItems']
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  todo: todoSlice
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware),
  devTools: true
});

export const persister = persistStore(rootStore);
export type RootState = ReturnType<typeof rootStore.getState>;

setupListeners(rootStore.dispatch);
