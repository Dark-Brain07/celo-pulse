import { render, screen } from '@testing-library/react';
import { StakingMetricsView2 } from '../../src/features/stakingmetrics/components/StakingMetricsView2';

describe('StakingMetricsView2', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView2 />);
    expect(screen.getByText('StakingMetrics View 2')).toBeInTheDocument();
  });
});