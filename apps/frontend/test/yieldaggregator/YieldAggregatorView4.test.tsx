import { render, screen } from '@testing-library/react';
import { YieldAggregatorView4 } from '../../src/features/yieldaggregator/components/YieldAggregatorView4';

describe('YieldAggregatorView4', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView4 />);
    expect(screen.getByText('YieldAggregator View 4')).toBeInTheDocument();
  });
});