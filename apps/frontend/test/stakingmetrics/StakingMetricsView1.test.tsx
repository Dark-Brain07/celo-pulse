import { render, screen } from '@testing-library/react';
import { StakingMetricsView1 } from '../../src/features/stakingmetrics/components/StakingMetricsView1';

describe('StakingMetricsView1', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView1 />);
    expect(screen.getByText('StakingMetrics View 1')).toBeInTheDocument();
  });
});