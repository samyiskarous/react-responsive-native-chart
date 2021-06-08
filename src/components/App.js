import styled from 'styled-components';
import './App.css';
import ReviewsScoreToTime from './charts-containers/ReviewsScoreToTime';

function App() {
  
  return (
    <AppDiv className="App">
      <ReviewsScoreToTime/>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  padding: 5rem
`;

export default App;
