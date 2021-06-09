import axios from 'axios';

const reviewsEndpoint = process.env.REACT_APP_REVIEWS_API;
const reviewsEndpointToken = process.env.REACT_APP_REVIEWS_API_TOKEN;

const questionsEndpoint = process.env.REACT_APP_QUESTIONS_API;

const API = {};

const configurations = {
    headers: {
        Authorization: `Bearer ${reviewsEndpointToken}`
    }
}

API.getReviewsFromDateToDate = (fromDate = "", toDate = "") => {
    return axios.get(`${reviewsEndpoint}?date_from=${fromDate}&date_to=${toDate}`, configurations)
                .then(response => response.data)
                .catch(error => error)
}

API.getQuestionsInfo = () => {
    return axios.get(questionsEndpoint)
                .then(response => response.data)
                .catch(error => error)
}

export default API;