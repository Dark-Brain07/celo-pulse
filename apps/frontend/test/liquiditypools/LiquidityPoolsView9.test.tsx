import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView9 } from '../../src/features/liquiditypools/components/LiquidityPoolsView9';

describe('LiquidityPoolsView9', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView9 />);
    expect(screen.getByText('LiquidityPools View 9')).toBeInTheDocument();
  });
});