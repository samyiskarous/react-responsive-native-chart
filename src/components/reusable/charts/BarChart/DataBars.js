import React from 'react';
import styled from 'styled-components';

const SPACE_FROM_Y_AXIS = '1rem';

// This 91% is to make the top end of the bar matches with the highest 
// Y-axis value indicator 
// (It won't change as the values increase. Same percentage tested.)
// So, this 91% the 100% container of the highest bar value 
const COMPENSATION_HEIGHT_PERCENTAGE = 91;

const DataBars = (props) => {

    const {barsHeightData, maxPercentageToPeak} = props;

    const highestBarPercentageToFullHeight = (maxPercentageToPeak / 10) * (COMPENSATION_HEIGHT_PERCENTAGE / 10);

    return (
        <DataBarsContainer highestBarPercentageToFullHeight={highestBarPercentageToFullHeight}>
            {barsHeightData.map((barHeight, index) => {
                return (
                    <DataBar 
                        key={index} 
                        computedHeight={barHeight.computed}
                        rawHeight={barHeight.raw}
                    />
                );
            })}
        </DataBarsContainer>
    );
}


// START: Styled Components
const DataBarsContainer = styled.div({
        
    display: 'flex',
    justifyContent: 'space-between',
    // To start the bars from the bottom
    alignItems: 'flex-end',

    
    height: props => props.highestBarPercentageToFullHeight 
                        ? `${props.highestBarPercentageToFullHeight}%` : '',
    width: '100%',

    position: 'absolute',
    bottom: '0',
});

const DataBar = styled.div`
    height: ${props => props.computedHeight ? `${props.computedHeight}%` : '100%'};
    width: 2rem;
    background-color: #696868;
    position: relative;

    margin-left: 0.5rem;

    &:hover{
        &::before {
            content: ${props => props.rawHeight ? `"${props.rawHeight}"` : 'ssssssss'};
            position: absolute;
            left: 97%;
            width: 2rem;
            font-size: 14px;
            color: gray;

            background-color: white;
            border: 1px solid gray;
            z-index: 10;

        }
        
        cursor: pointer;
        background-color: gray;
    }
    
`
// END: Styled Components

export default DataBars;