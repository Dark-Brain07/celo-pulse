import { render, screen } from '@testing-library/react';
import { TokenEconomicsView4 } from '../../src/features/tokeneconomics/components/TokenEconomicsView4';

describe('TokenEconomicsView4', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView4 />);
    expect(screen.getByText('TokenEconomics View 4')).toBeInTheDocument();
  });
});