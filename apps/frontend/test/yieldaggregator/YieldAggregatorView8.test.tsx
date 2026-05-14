import { render, screen } from '@testing-library/react';
import { YieldAggregatorView8 } from '../../src/features/yieldaggregator/components/YieldAggregatorView8';

describe('YieldAggregatorView8', () => {
  it('renders correctly', () => {
    render(<YieldAggregatorView8 />);
    expect(screen.getByText('YieldAggregator View 8')).toBeInTheDocument();
  });
});