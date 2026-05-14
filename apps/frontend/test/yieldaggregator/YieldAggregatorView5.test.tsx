import { render, screen } from '@testing-library/react';
import { YieldAggregatorView5 } from '../../src/features/yieldaggregator/components/YieldAggregatorView5';

describe('YieldAggregatorView5', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView5 />);
    expect(screen.getByText('YieldAggregator View 5')).toBeInTheDocument();
  });
});