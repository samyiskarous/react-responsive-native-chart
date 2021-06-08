import React, { useState } from 'react'
import styled from 'styled-components';
import BarChart from '../reusable/charts/BarChart';

const ReviewsScoreToTime = () => {
    const [startDate, setStartData] = useState(new Date());
    const [endDate, setEndData] = useState(new Date());
    const [reviewsScoreToTimeBarData] = useState([]);
            
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
                ]}
                size={300}
            />
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

export default ReviewsScoreToTime;