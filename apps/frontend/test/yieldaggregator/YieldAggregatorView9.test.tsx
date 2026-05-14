import { render, screen } from '@testing-library/react';
import { YieldAggregatorView9 } from '../../src/features/yieldaggregator/components/YieldAggregatorView9';

describe('YieldAggregatorView9', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView9 />);
    expect(screen.getByText('YieldAggregator View 9')).toBeInTheDocument();
  });
});