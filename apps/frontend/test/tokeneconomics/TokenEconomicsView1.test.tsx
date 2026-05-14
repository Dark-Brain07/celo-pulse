import { render, screen } from '@testing-library/react';
import { TokenEconomicsView1 } from '../../src/features/tokeneconomics/components/TokenEconomicsView1';

describe('TokenEconomicsView1', () => {
  it('renders correctly', () => {
    render(<TokenEconomicsView1 />);
    expect(screen.getByText('TokenEconomics View 1')).toBeInTheDocument();
  });
});