import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './features/counter/counterSlice';
import apiReducer from './reduxSlice/ApiSlice';
export default configureStore({
  reducer: {
    api: apiReducer,
  },
});