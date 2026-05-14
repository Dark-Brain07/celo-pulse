import { render, screen } from '@testing-library/react';
import { StakingMetricsView8 } from '../../src/features/stakingmetrics/components/StakingMetricsView8';

describe('StakingMetricsView8', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView8 />);
    expect(screen.getByText('StakingMetrics View 8')).toBeInTheDocument();
  });
});