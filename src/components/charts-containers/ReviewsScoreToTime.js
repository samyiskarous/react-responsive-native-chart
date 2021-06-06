import React, { useState } from 'react'
import BarChart from '../reusable/charts/BarChart';

const ReviewsScoreToTime = () => {
    const [startDate, setStartData] = useState(new Date());
    const [endDate, setEndData] = useState(new Date());
    const [reviewsScoreToTimeBarData] = useState([]);
            
    return (
        <div>
        {/* StartDate Date Picker */}
        {/* EndDate Date Picker */}
        <BarChart 
            labels={{
                x: 'Time',
                y: "Score"
            }}
            barsData={[
                {
                    x: 'Oct',
                    y: 23
                },
                {
                    x: 'Nov',
                    y: 4
                },
            ]}
        />
        </div>
    );
}

export default ReviewsScoreToTime;