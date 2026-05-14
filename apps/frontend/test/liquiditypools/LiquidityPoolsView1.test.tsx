import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView1 } from '../../src/features/liquiditypools/components/LiquidityPoolsView1';

describe('LiquidityPoolsView1', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView1 />);
    expect(screen.getByText('LiquidityPools View 1')).toBeInTheDocument();
  });
});