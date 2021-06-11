import { QUESTIONS_ERROR, QUESTIONS_LOADING, QUESTIONS_RECEIVED } from "../action-creators/questions-action-creator";

export const questionsInitialState = {
    data: [],
    loading: true,
    error: null
};

export const questionsReducer = (action, state = questionsInitialState) => {

    switch(action.type){
        case QUESTIONS_LOADING: 
            return {
                data: [],
                loading: true,
                error: null
            }
        case QUESTIONS_RECEIVED: 
            return {
                data: [...action.payload],
                loading: false,
                error: null
            }
        case QUESTIONS_ERROR:
            return {
                data: [],
                loading: false,
                error: {...action.payload}
            }
        default:
            return state
    }
}