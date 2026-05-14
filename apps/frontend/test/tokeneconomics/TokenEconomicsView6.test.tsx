import { render, screen } from '@testing-library/react';
import { TokenEconomicsView6 } from '../../src/features/tokeneconomics/components/TokenEconomicsView6';

describe('TokenEconomicsView6', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView6 />);
    expect(screen.getByText('TokenEconomics View 6')).toBeInTheDocument();
  });
});