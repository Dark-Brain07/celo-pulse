import { render, screen } from '@testing-library/react';
import { TokenEconomicsView5 } from '../../src/features/tokeneconomics/components/TokenEconomicsView5';

describe('TokenEconomicsView5', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView5 />);
    expect(screen.getByText('TokenEconomics View 5')).toBeInTheDocument();
  });
});