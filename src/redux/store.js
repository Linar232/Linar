import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import counterReducer from './counterSlice';
import { feedbackApi } from './feedbackApi'; // Импортируем созданный API

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer, // Добавляем редьюсер RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login', 'auth/updateUser'],
        ignoredPaths: ['auth.user']
      }
    }).concat(feedbackApi.middleware), // Добавляем middleware RTK Query
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;