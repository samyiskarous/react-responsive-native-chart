import React from 'react';
import styled from 'styled-components';

const XAxisInfo = (props) => {

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
    gridArea: 'xAxisInfo',

    display: 'flex',
    justifyContent: 'center',
});


const AxisLabel = styled.span({
    opacity: 0.6,
    letterSpacing: '1rem',
    color: 'gray',
    fontSize: '1em',

    position: 'relative',
    top: '1.5rem',
});

export default XAxisInfo;