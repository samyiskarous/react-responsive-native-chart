import React from 'react';
import styled from 'styled-components';

const DataBars = (props) => {

    /**
     * (maxPercentageToPeak)
     * Since we rounded up the highest Y-axis value, for better UX,
     * we need to specify the height percentage of that highest value to its 
     * rounded value, to have a precise bar height.
     */
    const {barsHeightData, maxHeightPercentageToPeak, highestPossibleHeight} = props;

    /**
     * It's the top area of the Y-axis, it always stays the same size and proportion
     * to the rest, no matter how many values we have on the Y-axis
     */
    return (
        <DataBarsContainer highestPossibleHeight={highestPossibleHeight}>
            {/* To limit the height in case our highest value isn't equal to its rounded one */}
            <HeightPercentageLimiter maxHeightPercentageToPeak={maxHeightPercentageToPeak}>
                {barsHeightData.map((barHeight, index) => {
                    return (
                        <DataBar 
                            key={index} 
                            computedHeight={barHeight.computed}
                            rawHeight={barHeight.raw}
                            negativeOrZero={barHeight.raw <= 0}
                        />
                        );
                    })}
            </HeightPercentageLimiter>
        </DataBarsContainer>
    );
}


// START: Styled Components
const DataBarsContainer = styled.div({
    width: 'inherit',
    height: 'inherit',

    display: 'flex',
    justifyContent: 'space-around',
    // To start the bars from the bottom
    alignItems: 'flex-end',
    
    height: props => props.highestPossibleHeight 
                    ? `${props.highestPossibleHeight}%` 
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

// if the height is 0, rotate the the ar to be facing downwards with constant height
// And with a label of the negative or 0 value
const DataBar = styled.div`
    height: ${props => props.negativeOrZero ?  '3.5%' : `${props.computedHeight}%`};
    width: 2rem;
    background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(138,138,138,1) 100%);
    position: relative;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    transform: ${props => props.negativeOrZero ? 'rotate(180deg) translate(0%, -130%)' : ''} ;

    margin-left: 0.5rem;

    &:hover{
        &::before {
            content: ${props => `"${props.rawHeight}"`};
            position: absolute;
            left: 97%;
            border-top-left-radius: ${props => props.negativeOrZero ? '10%' : '20%'} ;
            border-top-right-radius: 10%;
            border-bottom-right-radius: 10%;
            width: 3rem;
            font-size: 14px;
            
            color: gray;
            background-color: white;

            border: 1px solid gray;
            z-index: 10;

            transform: ${props => props.negativeOrZero ? 'rotate(180deg)' : ''} ;
        }
        cursor: pointer;
        background: gray;
    }
    
`
// END: Styled Components

export default DataBars;