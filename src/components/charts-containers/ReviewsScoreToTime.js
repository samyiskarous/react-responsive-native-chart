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
    // Raw reviews Data from the DB
    const [reviewsRawData, setReviewsRawData] = useState(reviewsInitialState);
    // A key-value form for the Units (ex: Jan / Feb ..etc) and their corresponding score
    const [selectedDatesUnitValuesWithScore, setSelectedDatesUnitValuesWithScore] = useState({});
    // A Date valid to be sent to the BarChart (ex: [{x: 2012, y: 251}, {x: }...etc])
    const [chartData, setChartData] = useState([{x: 0, y: 10}]);
    const [questionsInfo, setQuestionsInfo] = useState(questionsInitialState);
    const [currentScreenSize, setCurrentScreenSize] = useState()

    const firstRender = useRef(true);
        
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 991 })
    const isMobile = useMediaQuery({ maxWidth: 600 })

    useEffect(() => {
        if(isMobile){
            setCurrentScreenSize(MOBILE);
        }else if(isTablet){
            setCurrentScreenSize(TABLET);
        }else if(isDesktop){
            setCurrentScreenSize(DESKTOP);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isMobile, isTablet, isDesktop, setCurrentScreenSize])

    const renderDatesWhenQuestionsReady = (dates) => {
        if(questionsInfo.loading)
            return <p>Loading Questions...</p>   
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
            return <p>Loading Reviews...</p>
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

    const mapUnitValuesWithScoreToBarChartData = (selectedDatesUnitValuesWithScore) => {
        const mappedChartData = [];
        for (const unitValue in selectedDatesUnitValuesWithScore){
            mappedChartData.push({
                x: unitValue,
                y: parseInt(selectedDatesUnitValuesWithScore[unitValue]),
            })
        }
        return mappedChartData;
    }

    // default value comes from the state
    const fitUnitValuesWithScoreForCurrentScreen = (selectedDatesUnitValuesWithScoreParam = selectedDatesUnitValuesWithScore) => {
        let unitValuesWithScoreForCurrentScreen = {};

        const lengthBeforeFitting = Object.keys(selectedDatesUnitValuesWithScoreParam).length;
        if(lengthBeforeFitting > currentScreenSize){
            const weightPerBar = lengthBeforeFitting / currentScreenSize;
            const weightPerBarAfterDecimal = weightPerBar % 1;
            let weightRemaining = 0;
            let unitValueGettingFitted;
            let remainingScore = 0;
            
            for (const unitValue in selectedDatesUnitValuesWithScoreParam){
                const currentScore = selectedDatesUnitValuesWithScoreParam[unitValue];
                
                if(weightRemaining === 0){
                    // A sign of a new bar

                    weightRemaining = weightPerBar; 
                    unitValueGettingFitted = unitValue;
                    if(remainingScore > 0){
                        // We are coming from a previous Bar that has remainings
                        weightRemaining -= weightPerBarAfterDecimal;
                    }

                    // The weight remaining is definetly greater than 1.
                    unitValuesWithScoreForCurrentScreen[unitValueGettingFitted] = currentScore + remainingScore;
                    weightRemaining -= 1;
                    remainingScore = 0;
                }else{
                    // Existing bar getting fitted
                    // We'll be incrementing
                    const oldScore = unitValuesWithScoreForCurrentScreen[unitValueGettingFitted];
                    if(weightRemaining > 1){
                        unitValuesWithScoreForCurrentScreen[unitValueGettingFitted] = oldScore + currentScore;

                        weightRemaining -= 1;
                    }else{
                        const remainingWeightFromCurrentScore = currentScore * weightRemaining;
                        unitValuesWithScoreForCurrentScreen[unitValueGettingFitted] = oldScore + remainingWeightFromCurrentScore;

                        remainingScore = currentScore - remainingWeightFromCurrentScore;

                        weightRemaining = 0;
                    }
                }
            }
        }else{
            // We either have lower number for UnitValues (chart bars)
            // Or exactly the same number

            // So just return it as it is;
            return selectedDatesUnitValuesWithScoreParam;
        }

        return unitValuesWithScoreForCurrentScreen;
    }

    const prepareRawReviewsDataForBarChart = () => {
        // A- Get Unit Type (Year / Month / Day)
        const {selectedDatesUnitType, startUnit, endUnit} = getSelectedDatesUnitData();

        // B- Create array of Objects with score to each, to be incremented later if found
        let selectedDatesUnitValues = createObjectOfSelectedDatesUnitValues(startUnit, endUnit);

        // C- Start Incrementing the scores according to the data came from DB
        const selectedDatesUnitValuesWithScoreConst = calculateAverageScoreForUnitValues(selectedDatesUnitValues, selectedDatesUnitType)

        // to be used later when needed for resizing;
        setSelectedDatesUnitValuesWithScore(selectedDatesUnitValuesWithScoreConst);

        // D- Fit the UnitValues to be fitting in the 10/6/4 bars, depending on the screen size. 
        const unitValuesWithScoreForCurrentScreen = fitUnitValuesWithScoreForCurrentScreen(selectedDatesUnitValuesWithScoreConst)

        // E- Map computed data to Valid Chart data
        const mappedChartData = mapUnitValuesWithScoreToBarChartData(unitValuesWithScoreForCurrentScreen);
        
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

    // Prepare the Chart Date when the Reviews Raw data is ready.
    useEffect(() => {
        if(reviewsRawData.data.length > 0)
            prepareRawReviewsDataForBarChart();

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [reviewsRawData]);

    // Re-fit the UnitValuesScores with the corresponding screen size's points (chart bars)
    useEffect(() => {
        // Fit the UnitValues to be fitting in the 10/6/4 bars, depending on the screen size. 
        const unitValuesWithScoreForCurrentScreen = fitUnitValuesWithScoreForCurrentScreen()

        // Map computed data to Valid Chart data
        const mappedChartData = mapUnitValuesWithScoreToBarChartData(unitValuesWithScoreForCurrentScreen);

        setChartData(oldChartData => mappedChartData)

        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [currentScreenSize])
    // END: Listeners
    
    return (
        <ReviewScoreToTimeDiv>
            {/* To avoid racing errors, I made it possible to select dates 
             only when the questions data are retrieved from the DB*/}
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

    width: '100%'
});

const ReviewsChartContainer = styled.div({
    width: '100%',
    height: '30rem',
})
// END: Styled Components

const YEAR = 0;
const MONTH = 1;
const DAY = 2;

const DESKTOP = 10;
const TABLET = 6;
const MOBILE = 4;

export default ReviewsScoreToTime;