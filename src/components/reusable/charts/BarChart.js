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
    
    const BarChartContainerDiv = styled.div({
        height: `${size/16}rem`,
        width: `${size/16}rem`,
        borderLeft: `3px solid black`,
        borderBottom: `3px solid black`,
        borderBottomLeftRadius: 10
    });
    const AxisY = styled.div({
        height: '100%',
        width: '30%',
        backgroundColor: 'transparent',

        transform: 'translate(-100%)'
    });
    const AxisX = styled.div({
        width: '100%',
        height: '10%',
        backgroundColor: 'transparent',
    });
    const AxisXList = styled.ul({
        listStyleType: 'none',
        paddingLeft: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        margin: 0,
        position: 'relative',
        top: '3%'
    });

    const AxisXListItem = styled.li({
        opacity: props => props.transparent ? 0 : 1
    });

    const ListItemData = styled.span({
        display: 'flex',
        alignItems: 'center',
    })

    const ListItemValue = styled.span({
        width: '100%',
        textAlign: 'right'
    })

    const ListItemIndicator = styled.span({
        fontSize: '25px',
        paddingLeft: '15%'
    })
    return (
        <>
            <BarChartContainerDiv>
                <AxisY>
                    <AxisXList>
                        {yAxisValues.map((value, index) => {
                            return (
                                <AxisXListItem>
                                    <ListItemData>
                                        <ListItemValue>{value}</ListItemValue>
                                        <ListItemIndicator>-</ListItemIndicator>
                                    </ListItemData>
                                </AxisXListItem>
                            )

                        })}

                        <AxisXListItem transparent><span>0&nbsp;&nbsp;-</span></AxisXListItem>
                    </AxisXList>
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

    // Sort Desc
    const sortedAxisRawValues = rawAxisData.sort((a,b) => b-a);

    const roundedHighestValue = Math.ceil(sortedAxisRawValues[0] / 10) * 10;

    const incrementBy = roundedHighestValue / AXIS_VALUES_COUNT;

    for(let axisValue = incrementBy; 
            axisValue <= roundedHighestValue; 
            axisValue += incrementBy){
        axisValues.push(axisValue);
    }

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