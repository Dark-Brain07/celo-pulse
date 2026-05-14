import { render, screen } from '@testing-library/react';
import { StakingMetricsView9 } from '../../src/features/stakingmetrics/components/StakingMetricsView9';

describe('StakingMetricsView9', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView9 />);
    expect(screen.getByText('StakingMetrics View 9')).toBeInTheDocument();
  });
});