import { render, screen } from '@testing-library/react';
import { TokenEconomicsView9 } from '../../src/features/tokeneconomics/components/TokenEconomicsView9';

describe('TokenEconomicsView9', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView9 />);
    expect(screen.getByText('TokenEconomics View 9')).toBeInTheDocument();
  });
});