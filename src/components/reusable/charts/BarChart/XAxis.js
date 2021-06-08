import React from 'react';
import styled from 'styled-components';

const XAxis = (props) => {

    const {label} = props;

    return (
        <XAxisContainer>
            <LabelWrapper>
                <AxisLabel>
                    {label}
                </AxisLabel>
            </LabelWrapper>
        </XAxisContainer>
    );
}


const XAxisContainer = styled.div({
    gridArea: 'XAxis',
    
    display: 'contents',
    width: 'inherit',
});

const LabelWrapper = styled.div({
    display: 'flex',
    width: 'inherit',
    justifyContent: 'center',
})

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