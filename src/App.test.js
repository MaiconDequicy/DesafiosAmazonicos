// filepath: src/App.test.js
import { render, screen } from '@testing-library/react';
import { tw } from '@twind/react';
import App from './App';

test('renders learn react link', () => {
  render(<App tw={tw} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});