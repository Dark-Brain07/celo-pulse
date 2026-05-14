import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView6 } from '../../src/features/liquiditypools/components/LiquidityPoolsView6';

describe('LiquidityPoolsView6', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView6 />);
    expect(screen.getByText('LiquidityPools View 6')).toBeInTheDocument();
  });
});