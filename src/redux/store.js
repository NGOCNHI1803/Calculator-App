// store.js
import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './reducers';

const store = configureStore({
    reducer: calculatorReducer
});

export default store;
