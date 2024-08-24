import { SET_INPUT, SET_RESULT, CLEAR_INPUT, DELETE_LAST_INPUT, ADD_TO_HISTORY } from "./actionTypes";


export const setInput = (input) => ({
    type: SET_INPUT,
    payload: input,
});

export const setResult = (result) => ({
    type: SET_RESULT,
    payload: result,
});

export const clearInput = () => ({
    type: CLEAR_INPUT,
});

export const deleteLastInput = () => ({
    type: DELETE_LAST_INPUT,
});

export const addToHistory = (input, result) => ({
    type: ADD_TO_HISTORY,
    payload: {input, result},
});
