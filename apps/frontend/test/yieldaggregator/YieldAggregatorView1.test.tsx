import { render, screen } from '@testing-library/react';
import { YieldAggregatorView1 } from '../../src/features/yieldaggregator/components/YieldAggregatorView1';

describe('YieldAggregatorView1', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView1 />);
    expect(screen.getByText('YieldAggregator View 1')).toBeInTheDocument();
  });
});