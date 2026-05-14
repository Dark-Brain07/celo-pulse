import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView5 } from '../../src/features/liquiditypools/components/LiquidityPoolsView5';

describe('LiquidityPoolsView5', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView5 />);
    expect(screen.getByText('LiquidityPools View 5')).toBeInTheDocument();
  });
});