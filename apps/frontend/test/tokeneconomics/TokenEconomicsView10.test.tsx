import { render, screen } from '@testing-library/react';
import { TokenEconomicsView10 } from '../../src/features/tokeneconomics/components/TokenEconomicsView10';

describe('TokenEconomicsView10', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView10 />);
    expect(screen.getByText('TokenEconomics View 10')).toBeInTheDocument();
  });
});