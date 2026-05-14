import { render, screen } from '@testing-library/react';
import { YieldAggregatorView6 } from '../../src/features/yieldaggregator/components/YieldAggregatorView6';

describe('YieldAggregatorView6', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView6 />);
    expect(screen.getByText('YieldAggregator View 6')).toBeInTheDocument();
  });
});