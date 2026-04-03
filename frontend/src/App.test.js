import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Job Tracker heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/job tracker/i);
  expect(headingElement).toBeInTheDocument();
});
