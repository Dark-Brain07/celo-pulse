import { render, screen } from '@testing-library/react';
import { StakingMetricsView10 } from '../../src/features/stakingmetrics/components/StakingMetricsView10';

describe('StakingMetricsView10', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView10 />);
    expect(screen.getByText('StakingMetrics View 10')).toBeInTheDocument();
  });
});