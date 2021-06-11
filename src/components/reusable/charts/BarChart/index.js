import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import YAxisInfo from './YAxisInfo';
import DataBars from './DataBars';
import XAxisInfo from './XAxisInfo';

const Y_AXIS_VALUES_COUNT = 10;
/**
 * This is the area above the highest indicator on the Y Axis. it never changes.
 * Composed of the fontSize spacing from the indicator and the
 * downward shifted list of indicators
 */
const Y_AXIS_EXTRA_HEIGHT = 34;

const BarChart = (props) => {
    BarChart.propTypes = {
        labels: PropTypes.shape({
            x: PropTypes.string.isRequired,
            y: PropTypes.string.isRequired
        }).isRequired,
        rawBarsData: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        })).isRequired,
        showYAxisValues: PropTypes.bool,
    }

    const [highestPossibleHeight, setHighestPossibleHeight] = useState(0);

    const {labels, rawBarsData} = props;

    const yAxisRawValues = extractAxisRawData(rawBarsData, 'y');
    const maxPercentageToPeak = getPercentageOfHighestNumberToItsCeiledValue(yAxisRawValues)

    const yAxisValues = computeAxisValuesFromRawAxisData(yAxisRawValues);

    const computedBarsHeightData = computeBarsHeightFromRawValues(yAxisRawValues);
    
    // Compute the highest possible height (At the last indicator)
    const ref = useRef();
    useEffect(() => {
        const totalHeightInPixels = ref.current.clientHeight;
        const chartHeightWithoutExtraSpace = totalHeightInPixels - Y_AXIS_EXTRA_HEIGHT;
        setHighestPossibleHeight(
            oldState => (chartHeightWithoutExtraSpace / totalHeightInPixels) * 100
            )
    }, []);
    
    return (
        <>
            <BarChartGridContainer ref={ref}>
                <YAxisInfo label={labels.y} axisValues={yAxisValues}/>
                <DataBarsCotainer >
                    <DataBars 
                        barsHeightData={computedBarsHeightData}
                        maxHeightPercentageToPeak={maxPercentageToPeak}
                        highestPossibleHeight={highestPossibleHeight}
                    />
                </DataBarsCotainer>
                <XAxisInfo label={labels.x}/>
            </BarChartGridContainer 
>
        </>
    );
}

// START: Styled Components
const BarChartGridContainer = styled.div({
    width: '100%',
    height: '100%',

    display: 'grid',
    gridAutoFlow: 'row',

    gridTemplateColumns: '5rem auto',
    gridTemplateRows: 'auto 4rem',

    gridTemplateAreas: "'yAxisInfo barCharData' '. xAxisInfo'",
})

const DataBarsCotainer = styled.div({
    gridArea: 'barCharData',

    boxSizing: 'border-box',
    
    height: `100%`,
    width: '100%',
    borderLeft: `5px solid black`,
    borderBottom: `5px solid black`,
    borderBottomLeftRadius: 10,
    position: 'relative',
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
    const incrementBy = roundedHighestValue / Y_AXIS_VALUES_COUNT;

    for(let axisValue = incrementBy; 
            axisValue <= roundedHighestValue; 
            axisValue += incrementBy){
        axisValues.push(Math.round(axisValue * 10) / 10);
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