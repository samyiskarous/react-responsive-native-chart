import React from 'react';
import styled from 'styled-components';
import { Label } from './YAxis';

const XAxis = (props) => {

    const {label} = props;

    return (
        <XAxisContainer>
            <LabelWrapper>
                <Label>
                    {label}
                </Label>
            </LabelWrapper>
        </XAxisContainer>
    );
}


const XAxisContainer = styled.div({
    width: '100%',
    height: '20%',
    position: 'absolute',
});

const LabelWrapper = styled.div({
    height: '100%',
    position: 'relative',
    top: '2rem',
})

export default XAxis;