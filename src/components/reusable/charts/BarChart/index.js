import react from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import YAxisInfo from './YAxisInfo';
import DataBars from './DataBars';
import XAxisInfo from './XAxisInfo';

const AXIS_VALUES_COUNT = 7;

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
        square: PropTypes.bool
    }

    const {labels, rawBarsData, size = 400, square = false, showYAxisValues = false} = props;
    let chartWidth = square === false ? `${((size * 2)/16)}` : `${size/16}`; 
    let chartHeight = `${size/16}`;
    

    const yAxisRawValues = extractAxisRawData(rawBarsData, 'y');
    const maxPercentageToPeak = getPercentageOfHighestNumberToItsCeiledValue(yAxisRawValues)

    const yAxisValues = computeAxisValuesFromRawAxisData(yAxisRawValues);

    const xAxisValues = extractAxisRawData(rawBarsData, 'x');

    const computedBarsHeightData = computeBarsHeightFromRawValues(yAxisRawValues);
    
    return (
        <>
            <BarChartGridContainer 
                width={chartWidth}
                gridSections={{
                    // This minus and plus things are to keep the dimensions as specified 
                    // in the props, if specified 500, then 500 - then 4 or 5 rems
                    columns: `5rem minmax(${chartWidth-5}rem, auto)`,
                    rows: `minmax(${chartHeight - 4}rem, auto) 4rem`
                }}
            >
                <YAxisInfo label={labels.y} axisValues={yAxisValues}/>
                <DataBarsCotainer >
                    <DataBars 
                        barsHeightData={computedBarsHeightData}
                        maxHeightPercentageToPeak={maxPercentageToPeak}
                        heightPortions={AXIS_VALUES_COUNT+1}
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
    width: props => props.width ? `${props.width}rem` : '',

    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: props => props.gridSections ? props.gridSections.columns : '',
    gridTemplateRows: props => props.gridSections ? props.gridSections.rows : '',
    gridTemplateAreas: "'yAxisInfo barCharData' '. xAxisInfo'",
})

const DataBarsCotainer = styled.div({
    gridArea: 'barCharData',
    
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
    const incrementBy = roundedHighestValue / AXIS_VALUES_COUNT;

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