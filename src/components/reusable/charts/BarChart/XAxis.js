import React from 'react';
import styled from 'styled-components';

const XAxis = (props) => {

    const {label} = props;

    return (
        <XAxisContainer>
            <div style={{
                display: 'flex',
                width: 'inherit',
                justifyContent: 'center',
            }}>
                <AxisLabel>
                    {label}
                </AxisLabel>
            </div>
        </XAxisContainer>
    );
}


const XAxisContainer = styled.div({
    gridArea: 'XAxis',
    
    display: 'contents',
    width: 'inherit',
});

const AxisLabel = styled.span({
    opacity: 0.6,
    letterSpacing: '1rem',
    color: 'gray',
    fontSize: '1.5em',

    position: 'relative',
    top: '1.5rem',
    left: '2rem'
});

export default XAxis;