import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import BarChart from '../reusable/charts/BarChart';

const ReviewsScoreToTime = () => {
    const [startDate, setStartData] = useState(new Date());
    const [endDate, setEndData] = useState(new Date());
    const [reviewsScoreToTimeBarData] = useState([]);
    const [chartXPoints] = useState(10)
    const [chartSize, setCharSize] = useState(300)
    const [tempReviewsScoreToTimeBarData, setTempReviewsScoreToTimeBarData] = useState([...chartOriginalData]);

    const isDesktopSize = useMediaQuery({
        query: '(min-width: 768px)'
    })
    const isTabletSize = useMediaQuery({
        query: '(min-width: 600px)'
    })
    const isMobileSize = useMediaQuery({
        query: '(max-width: 599px)'
    })
    window.addEventListener("resize", ()=> console.log(window.innerWidth));
    useEffect(() => {
        if(isMobileSize){
            console.log('Mobile');
            setTempReviewsScoreToTimeBarData(oldState => [...chartOriginalData].slice(0, 4));
            setCharSize(200);
        }else if(isTabletSize){
            setTempReviewsScoreToTimeBarData(oldState => [...chartOriginalData].slice(0, 6));
            console.log('Tablet');
        }else if(isDesktopSize){
            console.log('Desktop')
            setTempReviewsScoreToTimeBarData(oldState => [...chartOriginalData]);
        }
    }, [])
            
    return (
        <ReviewScoreToTimeDiv>
            <DatesRangeDiv>
                <p>Start Data</p>
                <p>End Data</p>
            </DatesRangeDiv>

            <div style={{
                width: '100%',
                height: '100%'
            }}>
                <BarChart 
                    labels={{
                        x: 'Time',
                        y: "Score"
                    }}
                    rawBarsData={tempReviewsScoreToTimeBarData}
                    // size={chartSize}
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
        y: 31
    },
    {
        x: 'Nov',
        y: 2
    },
    {
        x: 'Jan',
        y: 40
    },
    {
        x: 'Jan',
        y: 41
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
        y: 9
    },
    {
        x: 'Jan',
        y: 11
    },
    {
        x: 'Jan',
        y: 64
    },
    {
        x: 'Jan',
        y: 7
    },
    {
        x: 'Oct',
        y: 13
    },
    {
        x: 'Jan',
        y: 11
    },
    {
        x: 'Jan',
        y: 22
    },
    {
        x: 'Jan',
        y: 7
    }
];

export default ReviewsScoreToTime;