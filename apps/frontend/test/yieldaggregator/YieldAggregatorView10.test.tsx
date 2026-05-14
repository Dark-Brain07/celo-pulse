import { render, screen } from '@testing-library/react';
import { YieldAggregatorView10 } from '../../src/features/yieldaggregator/components/YieldAggregatorView10';

describe('YieldAggregatorView10', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView10 />);
    expect(screen.getByText('YieldAggregator View 10')).toBeInTheDocument();
  });
});