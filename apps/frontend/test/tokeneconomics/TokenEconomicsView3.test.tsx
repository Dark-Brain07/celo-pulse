import { render, screen } from '@testing-library/react';
import { TokenEconomicsView3 } from '../../src/features/tokeneconomics/components/TokenEconomicsView3';

describe('TokenEconomicsView3', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView3 />);
    expect(screen.getByText('TokenEconomics View 3')).toBeInTheDocument();
  });
});