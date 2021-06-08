import React from 'react';
import styled from 'styled-components';

const YAxisInfo = (props) => {

    const {label, axisValues} = props;

    return (
        <YAxisContainer>
            <AxisLabel>{label}</AxisLabel>
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
    gridArea: 'yAxisInfo',
    
    display: 'flex',
    justifyContent: 'flex-end',
});

const ValuesList = styled.ul({
    listStyleType: 'none',
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: 'fit-content',
    margin: 0,

    // To start at position 0 on the graph
    position: 'relative',
    top: '0.9rem',
    right: '-1px'
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

const AxisLabel = styled.span({
    opacity: 0.6,
    color: 'gray',
    fontSize: '1.5em',

    writingMode: 'vertical-lr',
    transform: 'rotate(180deg)',

    letterSpacing: '1rem',

    position: 'relative',
    bottom: '5%',
    right: '1rem',
});
// END: Styled Components

export default YAxisInfo;