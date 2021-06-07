import React from 'react';
import styled from 'styled-components';

const DataBars = (props) => {

    /**
     * (maxPercentageToPeak)
     * Since we rounded up the highest Y-axis value, for better UX,
     * we need to specify the height percentage of that highest value to its 
     * rounded value, to have a precise bar height.
     */
    const {barsHeightData, maxHeightPercentageToPeak, heightPortions} = props;

    /**
     * It's the top area of the Y-axis, it always stays the same size and proportion
     * to the rest, no matter how many values we have on the Y-axis
     */
    const extraHeight = 100 / heightPortions;

    const correctedFullHeight = 100 - extraHeight; 

    return (
        <DataBarsContainer correctedFullHeight={correctedFullHeight}>
            {/* To limit the height in case our highest value isn't equal to its rounded one */}
            <HeightPercentageLimiter maxHeightPercentageToPeak={maxHeightPercentageToPeak}>
                {barsHeightData.map((barHeight, index) => {
                    return (
                        <DataBar 
                        key={index} 
                        computedHeight={barHeight.computed}
                        rawHeight={barHeight.raw}
                        />
                        );
                    })}
            </HeightPercentageLimiter>
        </DataBarsContainer>
    );
}


// START: Styled Components
const DataBarsContainer = styled.div({

    display: 'flex',
    justifyContent: 'space-between',
    // To start the bars from the bottom
    alignItems: 'flex-end',
    width: '100%',
    
    height: props => props.correctedFullHeight 
                    ? `${props.correctedFullHeight}%` 
                    : '',

    position: 'absolute',
    bottom: 0,
});

const HeightPercentageLimiter = styled.div({
    display: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
 
    width: '100%',
    height: props => props.maxHeightPercentageToPeak
                    ? `${props.maxHeightPercentageToPeak}%` 
                    : '',
 
    position: 'absolute',
    bottom: 0,
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