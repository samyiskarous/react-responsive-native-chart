import react from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const AXIS_VALUES_COUNT = 10;

const BarChart = (props) => {
    BarChart.propTypes = {
        labels: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.string.isRequired,
            y: PropTypes.string.isRequired
        })).isRequired,
        rawBarsData: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.string.isRequired,
            y: PropTypes.string.isRequired
        })).isRequired,
        showYAxisValues: PropTypes.bool,
        size: PropTypes.number,

    }

    const {labels, rawBarsData, size, showYAxisValues = false} = props;

    const axisRawValues = extractAxisRawData(rawBarsData, 'y');

    const yAxisValues = computeAxisValuesFromRawAxisData(axisRawValues);

    const xAxisValues = extractAxisRawData(rawBarsData, 'x');
    
    console.log(yAxisValues, xAxisValues)

    const BarChartContainerDiv = styled.div({
        height: `${size/16}rem`,
        width: `${size/16}rem`,
        borderLeft: `3px solid black`,
        borderBottom: `3px solid black`,
        borderBottomLeftRadius: 10
    });

    const AxisY = styled.div({
        height: '100%',
        width: '10%',
        backgroundColor: 'transparent',

        transform: 'translate(-100%)'
    });
    const AxisX = styled.div({
        width: '100%',
        height: '10%',
        backgroundColor: 'transparent',

    });

    return (
        <>
            <BarChartContainerDiv>
                <AxisY>

                </AxisY>

                <AxisX>

                </AxisX>
            </BarChartContainerDiv>
        </>
    );
}

// Used to convert "numeric" random data (2-3-7-18-14) to Axis Values (5-10-15-20...etc)
export const computeAxisValuesFromRawAxisData = (rawAxisData) => {
    let axisValues = [];

    // Convert axis raw data to axis ranges
    const sortedAxisRawValues = rawAxisData.sort((a,b) => a-b);

    const roundedLastValue = Math.ceil(sortedAxisRawValues[sortedAxisRawValues.length-1] / 10) * 10;

    const incrementBy = roundedLastValue / AXIS_VALUES_COUNT;

    for(let axisValue = 0; 
            axisValue <= roundedLastValue; 
            axisValue += incrementBy){
        axisValues.push(axisValue);
    }

    return axisValues;
}

// Used to get one axis data (may be used without sorting if needed)
const extractAxisRawData = (rawBarsData, axis) => {
    let axisRawData;

    switch(axis){
        case 'x':{
            axisRawData = rawBarsData.map((rawBarData, index) => {
                return rawBarData.x;
            })
            break;
        }
        case 'y':{
            axisRawData = rawBarsData.map((rawBarData, index) => {
                return rawBarData.y;
            })
            break;
        }
        default:
            break;
    }

    return axisRawData;
}

export default BarChart;