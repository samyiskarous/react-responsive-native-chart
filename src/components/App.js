import styled from 'styled-components';
import './App.css';
import ReviewsScoreToTime from './charts-containers/ReviewsScoreToTime';

function App() {

  const AppDiv = styled.div`
    padding: 5rem
  `;

  return (
    <AppDiv className="App">
      <ReviewsScoreToTime/>
    </AppDiv>
  );
}

export default App;
