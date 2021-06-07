import React, { useState } from 'react'
import styled from 'styled-components';
import BarChart from '../reusable/charts/BarChart';

const ReviewsScoreToTime = () => {
    const [startDate, setStartData] = useState(new Date());
    const [endDate, setEndData] = useState(new Date());
    const [reviewsScoreToTimeBarData] = useState([]);
            
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

    return (
        <ReviewScoreToTimeDiv>
            <DatesRangeDiv>
                <p>Start Data</p>
                <p>End Data</p>
            </DatesRangeDiv>

            <BarChart 
                labels={{
                    x: 'Time',
                    y: "Score"
                }}
                rawBarsData={[
                    {
                        x: 'Oct',
                        y: 2
                    },
                    {
                        x: 'Nov',
                        y: 5
                    },
                    {
                        x: 'Dec',
                        y: 11
                    },
                    {
                        x: 'Jan',
                        y: 17
                    },
                ]}
                size={300}
            />
        </ReviewScoreToTimeDiv>
    );
}

export default ReviewsScoreToTime;