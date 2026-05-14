import { render, screen } from '@testing-library/react';
import { StakingMetricsView4 } from '../../src/features/stakingmetrics/components/StakingMetricsView4';

describe('StakingMetricsView4', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView4 />);
    expect(screen.getByText('StakingMetrics View 4')).toBeInTheDocument();
  });
});