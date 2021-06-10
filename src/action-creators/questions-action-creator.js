import { questionsReducer } from "../reducers/questions-reducer";
import API from "../util/api-invocations";

const QUESTIONS_LOADING = 'QUESTIONS_LOADING';
const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED';
const QUESTIONS_ERROR = 'QUESTIONS_ERROR';

export const questionsActionCreator = {
    getQuestionsInfo: () => {
        questionsReducer({
            type: QUESTIONS_LOADING
        })

        return API.getQuestionsInfo()
            .then(questions => {
                return questionsReducer({
                    type: QUESTIONS_RECEIVED,
                    payload: questions
                })
            })
            .catch((error) => {
                return questionsReducer({
                    type: QUESTIONS_ERROR,
                    payload: error
                })
            })

    } //end function
};

export {
    QUESTIONS_RECEIVED,
    QUESTIONS_LOADING,
    QUESTIONS_ERROR
}