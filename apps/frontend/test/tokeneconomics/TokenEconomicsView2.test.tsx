import { render, screen } from '@testing-library/react';
import { TokenEconomicsView2 } from '../../src/features/tokeneconomics/components/TokenEconomicsView2';

describe('TokenEconomicsView2', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView2 />);
    expect(screen.getByText('TokenEconomics View 2')).toBeInTheDocument();
  });
});