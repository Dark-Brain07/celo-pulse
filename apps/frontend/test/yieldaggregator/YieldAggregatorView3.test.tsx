import { render, screen } from '@testing-library/react';
import { YieldAggregatorView3 } from '../../src/features/yieldaggregator/components/YieldAggregatorView3';

describe('YieldAggregatorView3', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView3 />);
    expect(screen.getByText('YieldAggregator View 3')).toBeInTheDocument();
  });
});