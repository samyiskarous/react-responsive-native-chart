import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { reviewsActionCreator } from '../../action-creators/reviews-action-creator';
import { questionsActionCreator } from '../../action-creators/questions-action-creator';
import { reviewsInitialState } from '../../reducers/reviews-reducer';
import { questionsInitialState } from '../../reducers/questions-reducer';
import BarChart from '../reusable/charts/BarChart';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const ReviewsScoreToTime = () => {
    const [startDate, setStartDate] = useState(new Date('2020-01-01'));
    const [endDate, setEndDate] = useState(new Date('2020-02-01'));
    const [reviewsRawData, setReviewsRawData] = useState(reviewsInitialState);
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
        if(reviewsRawData.loading)
            return <p>Loading Reviews</p>
        else if(reviewsRawData.error !== null)
            return <p>There's error in Reviews</p>
        else if(reviewsRawData.data.length === 0)
            return <p>No reviews found for the selected date.</p>
        else
            return componentToRender
    }

    const updateStartDateHandler = (newDate) => {
        setStartDate(oldDate => newDate);
    }

    const updateEndDateHandler = (newDate) => {
        setEndDate(newDate);
    }

    const checkDatesValidityAndGetReviews = () => {
        // End date should be after start date
        const endDataGreaterThanStartDate = endDate > startDate;
        if(endDataGreaterThanStartDate === false)
            alert("End Date must be greater than Start Date")

        const startDateForAPI = startDate.toISOString().split('T')[0];
        const endDateForAPI = endDate.toISOString().split('T')[0];

        getReviewsHandler(startDateForAPI, endDateForAPI);
    }

    const getReviewsHandler = (startDate, endDate) => {
        reviewsActionCreator.getReviewsFromDateToDate(startDate, endDate)
            .then(newReviewsState => {
                setReviewsRawData(newReviewsState)
            })
    }

    // START: Selected Dates Units Handlers
    /**
     * Unit will be Year/Month/Day
     */
    const getSelectedDatesUnitData = () => {        
        const startDateForAPI = startDate.toISOString().split('T')[0];
        const endDateForAPI = endDate.toISOString().split('T')[0];

        const [startYear, startMonth, startDay] = startDateForAPI.split('-');
        const [endYear, endMonth, endDay] = endDateForAPI.split('-');

        let selectedDatesUnit = "";
        let startUnit = 0;
        let endUnit = 0;

        if(endYear > startYear){
            selectedDatesUnit = YEAR;

            startUnit = startYear;
            endUnit = endYear;
        }else if(endMonth > startMonth){
            selectedDatesUnit = MONTH;

            startUnit = startMonth;
            endUnit = endMonth;
        }else if(endDay > startDay){
            selectedDatesUnit = DAY;

            startUnit = startDay;
            endUnit = endDay;
        }

        return {
            selectedDatesUnit,
            startUnit,
            endUnit
        }
    }

    const createArrayOfSelectedDatesUnitValues = (startUnit, endUnit) => {
        let arrayOfSelectedDatesUnitValues = [];
        console.log(startUnit, endUnit)

        const integerStartUnit = parseInt(startUnit);
        for(let unitValue = integerStartUnit; unitValue < endUnit; unitValue++){
            arrayOfSelectedDatesUnitValues.push({unitValue: unitValue, score: 0})
        }

        return arrayOfSelectedDatesUnitValues;
    }
    // END: Selected Dates Units Handlers

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
    }, [startDate, endDate])

    // Listen to new Reviews data from DB (not on first render)
    useEffect(() => {
        if(!firstRender.current){
            const {selectedDatesUnit, startUnit, endUnit} = getSelectedDatesUnitData();

            const arrayOfSelectedDatesUnitValues = createArrayOfSelectedDatesUnitValues(startUnit, endUnit);
            console.log(arrayOfSelectedDatesUnitValues)
        }
        else
            firstRender.current = false;
    }, [reviewsRawData])

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
                        rawBarsData={tempReviewsScoreToTimeBarData}
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

const YEAR = 'YEAR';
const MONTH = 'MONTH';
const DAY = 'DAY';

export default ReviewsScoreToTime;