import { REVIEWS_ERROR, REVIEWS_LOADING, REVIEWS_RECEIVED } from "../action-creators/reviews-action-creator";

export const reviewsInitialState = {
    data: [],
    loading: false,
    error: null
};

export const reviewsScoreToTimeReducer = (action, state = reviewsInitialState) => {
    switch(action.type){
        case REVIEWS_LOADING: 
            return {
                data: [],
                loading: true,
                error: null
            }
        case REVIEWS_RECEIVED: 
            return {
                data: [...action.payload],
                loading: false,
                error: null
            }
        case REVIEWS_ERROR:
            return {
                data: [],
                loading: false,
                error: {...action.payload}
            }
        default:
            return state
    }
}