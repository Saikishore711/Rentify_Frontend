import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from 'redux-thunk'; 
import rootReducer from "./Reducer/root-reducer.js";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export default store;
