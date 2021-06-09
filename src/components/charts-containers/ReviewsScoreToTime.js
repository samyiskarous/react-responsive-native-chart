import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import API from '../../util/api-invocations';
import BarChart from '../reusable/charts/BarChart';

const ReviewsScoreToTime = () => {
    const [startDate, setStartData] = useState(new Date());
    const [endDate, setEndData] = useState(new Date());
    const [reviewsScoreToTimeBarData] = useState([]);
    const [chartXPoints] = useState(10)
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

    useEffect(() => {
        let questionsInfo = {};
        let lineChartData = {}; 
        API.getReviewsFromDateToDate("2020-01-01", "2020-02-05")
            .then(reviewsResponse => {
                lineChartData = reviewsResponse.line_chart_data;

            })
            .then(() => {
                API.getQuestionsInfo()
                .then(questionsResponse => {
                    questionsInfo = questionsResponse;

                    console.log('reviews', lineChartData)
                    console.log('questions', questionsInfo);
                })
            })        
    }, []);
   
    return (
        <ReviewScoreToTimeDiv>
            <DatesRangeDiv>
                <p>Start Data</p>
                <p>End Data</p>
            </DatesRangeDiv>

            <div style={{
                width: '100%',
                height: '30rem',
            }}>
                <BarChart 
                    labels={{
                        x: "Time",
                        y: "Score"
                    }}
                    rawBarsData={tempReviewsScoreToTimeBarData}
                />
            </div>
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