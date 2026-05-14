import { render, screen } from '@testing-library/react';
import { LiquidityPoolsView7 } from '../../src/features/liquiditypools/components/LiquidityPoolsView7';

describe('LiquidityPoolsView7', () => {
  it('renders correctly', () => {
    render(<LiquidityPoolsView7 />);
    expect(screen.getByText('LiquidityPools View 7')).toBeInTheDocument();
  });
});