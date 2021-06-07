import react from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import AxisY from './AxisY';
import DataBars from './DataBars';

const AXIS_VALUES_COUNT = 16;

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

    const yAxisRawValues = extractAxisRawData(rawBarsData, 'y');
    const maxPercentageToPeak = getPercentageOfHighestNumberToItsCeiledValue(yAxisRawValues)

    const yAxisValues = computeAxisValuesFromRawAxisData(yAxisRawValues);

    const xAxisValues = extractAxisRawData(rawBarsData, 'x');

    const computedBarsHeightData = computeBarsHeightFromRawValues(yAxisRawValues);
    
    return (
        <>
            <BarChartContainerDiv size={size}>
                <AxisY axisValues={yAxisValues}/>
            
                    <DataBars 
                        barsHeightData={computedBarsHeightData}
                        maxHeightPercentageToPeak={maxPercentageToPeak}
                        heightPortions={AXIS_VALUES_COUNT+1}
                    />
                <AxisX/>
            </BarChartContainerDiv>
        </>
    );
}

// START: Styled Components
const BarChartContainerDiv = styled.div({
    height: `fit-content`,
    width: props => props.size ? `${props.size/16}rem` : '',
    borderLeft: `5px solid black`,
    borderBottom: `5px solid black`,
    borderBottomLeftRadius: 10,
    position: 'relative'
});

const AxisX = styled.div({
    width: '100%',
    height: '10%',
    backgroundColor: 'transparent',
});
// END: Styled Components

const computeBarsHeightFromRawValues = (barsRawValues) => {
    const heighestBarValue = Math.max(...barsRawValues);

    const computedBarsHeight = barsRawValues.map((barRawValue) => {
        return {
            raw: barRawValue,
            computed: (barRawValue / heighestBarValue) * 100
        };
    })

    return computedBarsHeight;
}

const getPercentageOfHighestNumberToItsCeiledValue = (rawAxisData) => {
    const heighestRawValue = Math.max(...rawAxisData);
    const heighestRoundedValue = Math.ceil(heighestRawValue/10) * 10;
    return heighestRawValue === heighestRoundedValue 
            ? 100 
            : (heighestRawValue / heighestRoundedValue) * 100;
}

// Used to convert "numeric" random data (2-3-7-18-14) to Axis Values (5-10-15-20)
const computeAxisValuesFromRawAxisData = (rawAxisData) => {
    let axisValues = [];

    const roundedHighestValue = Math.ceil(Math.max(...rawAxisData) / 10) * 10;

    const incrementBy = roundedHighestValue / AXIS_VALUES_COUNT;

    for(let axisValue = incrementBy; 
            axisValue <= roundedHighestValue; 
            axisValue += incrementBy){
        axisValues.push(axisValue);
    }

    // reversed to show the Y-axis value in Asc order.
    return axisValues.reverse();
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