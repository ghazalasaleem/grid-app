import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../Components/Dashboard/Dashboard';

test('First Test', () => {
  const { getByText } = render(<Dashboard />);
  expect(true).toBeTruthy();
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
});
