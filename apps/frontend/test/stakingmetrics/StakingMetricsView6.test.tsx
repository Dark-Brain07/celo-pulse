import { render, screen } from '@testing-library/react';
import { StakingMetricsView6 } from '../../src/features/stakingmetrics/components/StakingMetricsView6';

describe('StakingMetricsView6', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView6 />);
    expect(screen.getByText('StakingMetrics View 6')).toBeInTheDocument();
  });
});