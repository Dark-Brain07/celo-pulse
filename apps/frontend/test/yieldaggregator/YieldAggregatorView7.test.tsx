import { render, screen } from '@testing-library/react';
import { YieldAggregatorView7 } from '../../src/features/yieldaggregator/components/YieldAggregatorView7';

describe('YieldAggregatorView7', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView7 />);
    expect(screen.getByText('YieldAggregator View 7')).toBeInTheDocument();
  });
});