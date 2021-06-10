import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { reviewsActionCreator } from '../../action-creators/reviews-action-creator';
import { questionsActionCreator } from '../../action-creators/questions-action-creator';
import { reviewsInitialState } from '../../reducers/reviews-reducer';
import { questionsInitialState } from '../../reducers/questions-reducer';
import BarChart from '../reusable/charts/BarChart';

const ReviewsScoreToTime = () => {
    const [startDate, setStartData] = useState(new Date());
    const [endDate, setEndData] = useState(new Date());
    const [reviewsScoreToTime, setReviewsScoreToTime] = useState(reviewsInitialState);
    const [questionsInfo, setQuestionsInfo] = useState(questionsInitialState);
    const [currentScreenSize, setCurrentScreenSize] = useState()
    const [tempReviewsScoreToTimeBarData, setTempReviewsScoreToTimeBarData] = useState([...chartOriginalData]);

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
        if(reviewsScoreToTime.loading)
            return <p>Loading Reviews</p>
        else if(reviewsScoreToTime.error !== null)
            return <p>There's error in Reviews</p>
        else if(reviewsScoreToTime.data.length === 0)
            return <p>No reviews found for the selected date.</p>
        else
            return componentToRender
    }
    const getReviewsHandler = () => {
        reviewsActionCreator.getReviewsFromDateToDate("2020-01-01", "2020-02-05")
            .then(newReviewsState => {
                
                setReviewsScoreToTime(oldState => newReviewsState)
            })
    }

    useEffect(() => {
        questionsActionCreator.getQuestionsInfo()
            .then(questions => {
                setQuestionsInfo(oldState => questions)
            })        
    }, []);

    
    return (
        <ReviewScoreToTimeDiv>
            {renderDatesWhenQuestionsReady(
                <DatesRangeDiv>
                    <p onClick={getReviewsHandler}>Start Data</p>
                    <p>End Data</p>
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

    width: '30%'
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

export default ReviewsScoreToTime;