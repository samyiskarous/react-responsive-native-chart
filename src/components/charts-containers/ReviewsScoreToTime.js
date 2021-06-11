import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { reviewsActionCreator, REVIEWS_LOADING } from '../../action-creators/reviews-action-creator';
import { questionsActionCreator } from '../../action-creators/questions-action-creator';
import { reviewsInitialState, reviewsScoreToTimeReducer } from '../../reducers/reviews-reducer';
import { questionsInitialState } from '../../reducers/questions-reducer';
import BarChart from '../reusable/charts/BarChart';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const ReviewsScoreToTime = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [reviewsRawData, setReviewsRawData] = useState(reviewsInitialState);
    const [chartData, setChartData] = useState([{x: 0, y: 10}]);
    const [questionsInfo, setQuestionsInfo] = useState(questionsInitialState);
    const [currentScreenSize, setCurrentScreenSize] = useState()
    const [tempReviewsScoreToTimeBarData, setTempReviewsScoreToTimeBarData] = useState([...chartOriginalData]);

    const firstRender = useRef(true);
        
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 991 })
    const isMobile = useMediaQuery({ maxWidth: 600 })

    const updateReviewsScorePointsCount = (pointsCountRequired) => {
        if(pointsCountRequired !== tempReviewsScoreToTimeBarData.count){
            setTempReviewsScoreToTimeBarData(chartOriginalData.slice(0, pointsCountRequired));
        }
    }

    useEffect(() => {
        if(isMobile){
            setCurrentScreenSize('Mobile');
            updateReviewsScorePointsCount(4);
        }else if(isTablet){
            setCurrentScreenSize('Tablet');
            updateReviewsScorePointsCount(6);
        }else if(isDesktop){
            setCurrentScreenSize('Desktop');
            updateReviewsScorePointsCount(10);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isMobile, isTablet, isDesktop, setCurrentScreenSize])

    const renderDatesWhenQuestionsReady = (dates) => {
        if(questionsInfo.loading)
            return <p>Loading Questions</p>   
        else if(questionsInfo.error !== null)
            return <p>There's error in Questions</p>
        else if(questionsInfo.data.length === 0)
            return <p>No questions found.</p>
        else
            return dates
    } 

    const renderReviewsIfReady = (componentToRender) => {
        if(!startDate || !endDate)
            return <p>Select Both Start Date & End Date</p>
        if(reviewsRawData.loading)
            return <p>Loading Reviews</p>
        else if(reviewsRawData.error !== null)
            return <p>There's error in Reviews</p>
        else if(reviewsRawData.data.length === 0)
            return <p>No reviews found for the selected date.</p>
        else if(chartData.length > 0){
            return componentToRender
        }
    }

    const updateStartDateHandler = (newDate) => {
        setStartDate(oldDate => newDate);
    }

    const updateEndDateHandler = (newDate) => {
        setEndDate(newDate);
    }

    const checkDatesValidityAndGetReviews = () => {
        if(!startDate || !endDate)
            return false

        // End date should be after start date
        const endDataGreaterThanStartDate = endDate > startDate;
        if(endDataGreaterThanStartDate === false)
            alert("End Date must be greater than Start Date")

        const startDateForAPI = startDate.toISOString().split('T')[0];
        const endDateForAPI = endDate.toISOString().split('T')[0];

        getReviewsHandler(startDateForAPI, endDateForAPI);
    }

    const getReviewsHandler = (startDate, endDate) => {

        setReviewsRawData(oldRawReviewsState => reviewsScoreToTimeReducer({
            type: REVIEWS_LOADING
        }))

        reviewsActionCreator.getReviewsFromDateToDate(startDate, endDate)
            .then(newReviewsState => {
                setReviewsRawData(oldRawReviewsState => newReviewsState)
            })
    }

    // START: Selected Dates Units Handlers
    /**
     * Unit will be Year/Month/Day
     */
    const getSelectedDatesUnitData = () => {   
        if(!startDate || !endDate)
            return false
        
            
        const startDateForAPI = startDate.toISOString().split('T')[0];
        const endDateForAPI = endDate.toISOString().split('T')[0];

        const [startYear, startMonth, startDay] = startDateForAPI.split('-');
        const [endYear, endMonth, endDay] = endDateForAPI.split('-');

        let selectedDatesUnitType = "";
        let startUnit = 0;
        let endUnit = 0;


        if(endYear > startYear){
            selectedDatesUnitType = YEAR;

            startUnit = startYear;
            endUnit = endYear;
        }else if(endMonth > startMonth){
            selectedDatesUnitType = MONTH;

            startUnit = startMonth;
            endUnit = endMonth;
        }else if(endDay > startDay){
            selectedDatesUnitType = DAY;

            startUnit = startDay;
            endUnit = endDay;
        }

        return {
            selectedDatesUnitType,
            startUnit,
            endUnit
        }
    }

    const createObjectOfSelectedDatesUnitValues = (startUnit, endUnit) => {
        let selectedDatesUnitValues = {};

        const integerStartUnit = parseInt(startUnit);
        for(let unitValue = integerStartUnit; unitValue <= endUnit; unitValue++){
            selectedDatesUnitValues[unitValue] = 0;
        }

        return selectedDatesUnitValues;
    }
    // END: Selected Dates Units Handlers

    const getScoreOfQuestionChoice = (questionID, choiceID) => {
        const questions = questionsInfo.data[0].questions;
        let scoreOfQuestionChoice;
        questions.forEach((question) => {
            if(question.id === questionID){
                question.choices.forEach((choice) => {
                    if(choice.id === choiceID){
                        if(choice.text === 'Bad')
                            scoreOfQuestionChoice = -1;

                        if(choice.text === 'Neutral')
                            scoreOfQuestionChoice = 0;

                        if(choice.text === 'Good')
                            scoreOfQuestionChoice = 1;
                    }
                })
            }
        })

        return scoreOfQuestionChoice;
    }

    const getAverageScoreToReview = (questions) => {
        const scoreOfSecondAnswer = getScoreOfQuestionChoice(questions[1].question, questions[1].choice);
        const scoreOfFourthAnswer = getScoreOfQuestionChoice(questions[3].question, questions[3].choice);

        const averageScore = (scoreOfSecondAnswer + scoreOfFourthAnswer) / 2;

        return averageScore;
    }

    const calculateAverageScoreForUnitValues = (selectedDatesUnitValues, selectedDatesUnitType) => {
        const selectedDatesUnitValuesWithScore = {...selectedDatesUnitValues};
        
        reviewsRawData.data.forEach((review, index) => {
            const {submitted_at, answers} = review;
            // 1- Get the average of the Score
            const newAverageScore = getAverageScoreToReview(answers);

            // 2- Get the Unit Value (2012 or 01 ...etc) from the date
            // selectedDatesUnitType will get use the year/month/day
            const unitValue = parseInt(submitted_at.split('T')[0].split('-')[selectedDatesUnitType]);

            // 3- Append the score to the selectedDatesUnitValues using the unitValue
            const oldScore = selectedDatesUnitValuesWithScore[unitValue];

            selectedDatesUnitValuesWithScore[unitValue] = newAverageScore + oldScore;
        })

        return selectedDatesUnitValuesWithScore;
    }

    const prepareRawReviewsDataForBarChart = () => {
        // A- Get Unit Type (Year / Month / Day)
        const {selectedDatesUnitType, startUnit, endUnit} = getSelectedDatesUnitData();

        // B- Create array of Objects with score to each, to be incremented later if found
        let selectedDatesUnitValues = createObjectOfSelectedDatesUnitValues(startUnit, endUnit);

        // // C- Start Incrementing the scores according to the data came from DB
        let selectedDatesUnitValuesWithScore = calculateAverageScoreForUnitValues(selectedDatesUnitValues, selectedDatesUnitType)
        
        // // E- Map computed data to Valid Chart data
        let mappedChartData = []
        for (const unitValue in selectedDatesUnitValuesWithScore){
            mappedChartData.push({
                x: unitValue,
                y: parseInt(selectedDatesUnitValuesWithScore[unitValue]),
            })
        }
        setChartData(oldChartData => mappedChartData)
    }

    // START: Listeners
    useEffect(() => {
        questionsActionCreator.getQuestionsInfo()
            .then(questions => {
                setQuestionsInfo(oldState => questions)
            })            
    }, []);

    // Listen to Dates changes (not on first render)
    useEffect(() => {
        if(!firstRender.current)
            checkDatesValidityAndGetReviews();
        else
            firstRender.current = false;
            

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [startDate, endDate])

    useEffect(() => {
        if(reviewsRawData.data.length > 0)
            prepareRawReviewsDataForBarChart();

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [reviewsRawData]);

    // END: Listeners
    
    return (
        <ReviewScoreToTimeDiv>
            {renderDatesWhenQuestionsReady(
                <DatesRangeDiv>
                    <span>
                        Start Date: &nbsp;
                        <DatePicker 
                            selected={startDate} 
                            onChange={updateStartDateHandler}
                        />
                    </span>
                    <span>
                        End Date: &nbsp;
                        <DatePicker 
                            selected={endDate} 
                            onChange={updateEndDateHandler}
                        />
                    </span>
                </DatesRangeDiv>
            )}
            {renderReviewsIfReady(
                <ReviewsChartContainer>
                    <BarChart 
                        labels={{
                            x: "Time",
                            y: "Score"
                        }}
                        rawBarsData={chartData}
                    />
                </ReviewsChartContainer>
            )}

        </ReviewScoreToTimeDiv>
    );
}


// START: Styled Components
const ReviewScoreToTimeDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
});

const DatesRangeDiv = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5rem',

    width: '70%'
});

const ReviewsChartContainer = styled.div({
    width: '100%',
    height: '30rem',
})
// END: Styled Components

let chartOriginalData = [
    {
        x: 'Oct',
        y: 20
    },
    {
        x: 'Nov',
        y: 2
    },
    {
        x: 'Jan',
        y: 18
    },
    {
        x: 'Jan',
        y: 9
    },
    {
        x: 'Jan',
        y: 11
    },
    {
        x: 'Jan',
        y: 41
    },
    {
        x: 'Jan',
        y: 7
    },
    {
        x: 'Jan',
        y: 25
    },
    {
        x: 'Dec',
        y: 5
    },
    {
        x: 'Jan',
        y: 64
    },
    {
        x: 'Jan',
        y: 7
    }
];

const YEAR = 0;
const MONTH = 1;
const DAY = 2;

export default ReviewsScoreToTime;