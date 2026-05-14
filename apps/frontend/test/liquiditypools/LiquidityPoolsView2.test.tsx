import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView2 } from '../../src/features/liquiditypools/components/LiquidityPoolsView2';

describe('LiquidityPoolsView2', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView2 />);
    expect(screen.getByText('LiquidityPools View 2')).toBeInTheDocument();
  });
});