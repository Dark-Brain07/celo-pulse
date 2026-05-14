import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView8 } from '../../src/features/liquiditypools/components/LiquidityPoolsView8';

describe('LiquidityPoolsView8', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView8 />);
    expect(screen.getByText('LiquidityPools View 8')).toBeInTheDocument();
  });
});