import { render, screen } from '@testing-library/react';
import { StakingMetricsView5 } from '../../src/features/stakingmetrics/components/StakingMetricsView5';

describe('StakingMetricsView5', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView5 />);
    expect(screen.getByText('StakingMetrics View 5')).toBeInTheDocument();
  });
});