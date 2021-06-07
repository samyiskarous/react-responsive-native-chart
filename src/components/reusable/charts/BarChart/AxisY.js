import React from 'react';
import styled from 'styled-components';

const AxisY = (props) => {

    const {axisValues} = props;

    return (
        <AxisYContainer>
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
        </AxisYContainer>
    );
}

// START: Styled Components
const AxisYContainer = styled.div({
    height: '100%',
    width: '30%',
    backgroundColor: 'transparent',

    transform: 'translate(-100%)',

    // To start at position 0 on the graph
    position: 'relative',
    top: 14
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
// END: Styled Components

export default AxisY;