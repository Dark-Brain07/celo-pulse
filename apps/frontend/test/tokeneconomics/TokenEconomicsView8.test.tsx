import { render, screen } from '@testing-library/react';
import { TokenEconomicsView8 } from '../../src/features/tokeneconomics/components/TokenEconomicsView8';

describe('TokenEconomicsView8', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView8 />);
    expect(screen.getByText('TokenEconomics View 8')).toBeInTheDocument();
  });
});