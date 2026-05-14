import { render, screen } from '@testing-library/react';
import { StakingMetricsView3 } from '../../src/features/stakingmetrics/components/StakingMetricsView3';

describe('StakingMetricsView3', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView3 />);
    expect(screen.getByText('StakingMetrics View 3')).toBeInTheDocument();
  });
});