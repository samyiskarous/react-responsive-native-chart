import React from 'react';
import styled from 'styled-components';

const XAxis = (props) => {

    const {label} = props;

    return (
        <XAxisContainer>
            <AxisLabel>
                {label}
            </AxisLabel>
        </XAxisContainer>
    );
}


const XAxisContainer = styled.div({
    gridArea: 'XAxis',
    
    display: 'flex',
    position: 'relative'
});

const AxisLabel = styled.span({
    opacity: 0.6,
    letterSpacing: '1rem',
    color: 'gray',
    fontSize: '24px',

    position: 'absolute',

    top: '-2rem',
    right: '12rem',
});

export default XAxis;