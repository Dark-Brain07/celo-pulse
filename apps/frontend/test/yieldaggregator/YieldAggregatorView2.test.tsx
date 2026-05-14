import { render, screen } from '@testing-library/react';
import { YieldAggregatorView2 } from '../../src/features/yieldaggregator/components/YieldAggregatorView2';

describe('YieldAggregatorView2', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView2 />);
    expect(screen.getByText('YieldAggregator View 2')).toBeInTheDocument();
  });
});