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
        </div>
    );
}

export default ReviewsScoreToTime;