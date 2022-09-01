import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/and save to reload/i);
  expect(headerElement).toBeInTheDocument();
});
