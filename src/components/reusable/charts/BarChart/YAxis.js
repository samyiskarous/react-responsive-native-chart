import React from 'react';
import styled from 'styled-components';

const YAxis = (props) => {

    const {label, axisValues} = props;

    return (
        <YAxisContainer>
            <LabelWrapper>
                <Label>{label}</Label>
            </LabelWrapper>
            <ValuesList>
                {axisValues.map((value, index) => {
                    return (
                        <ValuesListItem key={index}>
                            <ListItemData>
                                <ListItemValue>{value}</ListItemValue>
                                <ListItemIndicator>-</ListItemIndicator>
                            </ListItemData>
                        </ValuesListItem>
                    )
                    
                })}

                    <ValuesListItem transparent>
                        <ListItemData>
                            <ListItemValue>0</ListItemValue>
                            <ListItemIndicator>-</ListItemIndicator>
                        </ListItemData>
                    </ValuesListItem>
            </ValuesList>
        </YAxisContainer>
    );
}

// START: Styled Components
const YAxisContainer = styled.div({
    height: '100%',
    width: '25%',
    backgroundColor: 'transparent',

    transform: 'translate(-100%)',

    // To start at position 0 on the graph
    position: 'relative',
    top: '0.92rem'
});

const ValuesList = styled.ul({
    listStyleType: 'none',
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: 0,
});

const ValuesListItem = styled.li({
    opacity: props => props.transparent ? 0 : 1,
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
    paddingLeft: '0.7rem'
})

const LabelWrapper = styled.div({
    transform: 'rotate(-90deg)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '50%'
})
const Label = styled.span({
    opacity: 0.2,
    letterSpacing: '1rem',
    fontSize: '24px'
});
// END: Styled Components

export default YAxis;