import { render, screen } from '@testing-library/react';
import RotatingText from './components/RotatingText';

test('displays first message', () => {
  render(<RotatingText messages={["hello", "world"]} interval={1000} />);
  expect(screen.getByText('hello')).toBeInTheDocument();
});
