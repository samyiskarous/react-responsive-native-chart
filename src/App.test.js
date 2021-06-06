
import { render, screen } from '@testing-library/react';
import App from './components/App';
import { computeAxisValuesFromRawAxisData } from './components/reusable/charts/BarChart';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Compute Axis Values From Raw Axis Data', () => {
    expect(
        computeAxisValuesFromRawAxisData([2,5,4])
    ).toBe([0,2,4,6,8,10])
    expect(
        computeAxisValuesFromRawAxisData([12,13,19])
    ).toBe([0,2,4,6,8,10,12,14,16,18,20])
});