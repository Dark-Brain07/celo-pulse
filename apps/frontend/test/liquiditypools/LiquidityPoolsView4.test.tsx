import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView4 } from '../../src/features/liquiditypools/components/LiquidityPoolsView4';

describe('LiquidityPoolsView4', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView4 />);
    expect(screen.getByText('LiquidityPools View 4')).toBeInTheDocument();
  });
});