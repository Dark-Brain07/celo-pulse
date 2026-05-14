import { render, screen } from '@testing-library/react';
import { TokenEconomicsView7 } from '../../src/features/tokeneconomics/components/TokenEconomicsView7';

describe('TokenEconomicsView7', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView7 />);
    expect(screen.getByText('TokenEconomics View 7')).toBeInTheDocument();
  });
});