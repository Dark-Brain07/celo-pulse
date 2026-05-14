import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView10 } from '../../src/features/liquiditypools/components/LiquidityPoolsView10';

describe('LiquidityPoolsView10', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView10 />);
    expect(screen.getByText('LiquidityPools View 10')).toBeInTheDocument();
  });
});