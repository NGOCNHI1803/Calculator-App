
import { SET_INPUT, SET_RESULT, CLEAR_INPUT, DELETE_LAST_INPUT, ADD_TO_HISTORY } from "./actionTypes";


const initialState = {
    input: '',
    result: '',
    history: [],
};

const calculatorReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_INPUT:
            return {...state, input: action.payload,};
        case SET_RESULT:
            return {...state, result: action.payload};
        case CLEAR_INPUT:
            return {...state, input: '', result: ''};
        case DELETE_LAST_INPUT:
            return {...state, input: state.input.slice(0, -1)};
        case ADD_TO_HISTORY:
            return {...state, history: [...state.history, action.payload]};
        default:
            return state;
    }
    
};

export default calculatorReducer;