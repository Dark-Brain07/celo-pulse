import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView3 } from '../../src/features/liquiditypools/components/LiquidityPoolsView3';

describe('LiquidityPoolsView3', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView3 />);
    expect(screen.getByText('LiquidityPools View 3')).toBeInTheDocument();
  });
});