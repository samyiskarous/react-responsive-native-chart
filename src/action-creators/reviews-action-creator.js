import { reviewsScoreToTimeReducer } from "../reducers/reviews-reducer";
import API from "../util/api-invocations";

const REVIEWS_LOADING = 'REVIEWS_LOADING';
const REVIEWS_RECEIVED = 'REVIEWS_RECEIVED';
const REVIEWS_ERROR = 'REVIEWS_ERROR';

export const reviewsActionCreator = {
    getReviewsFromDateToDate: (fromDate, toDate) => {
        reviewsScoreToTimeReducer({
            type: REVIEWS_LOADING
        })

        return API.getReviewsFromDateToDate(fromDate, toDate)
            .then(reviewsResponse => {
                const lineChartData = reviewsResponse.line_chart_data;

                return reviewsScoreToTimeReducer({
                    type: REVIEWS_RECEIVED,
                    payload: lineChartData
                })
            })
            .catch((error) => {
                return reviewsScoreToTimeReducer({
                    type: REVIEWS_ERROR,
                    payload: error
                })
            })

    } //end function
};

export {
    REVIEWS_RECEIVED,
    REVIEWS_LOADING,
    REVIEWS_ERROR
}