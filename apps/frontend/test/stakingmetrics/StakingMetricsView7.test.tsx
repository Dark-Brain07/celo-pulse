import { render, screen } from '@testing-library/react';
import { StakingMetricsView7 } from '../../src/features/stakingmetrics/components/StakingMetricsView7';

describe('StakingMetricsView7', () => {
  it('renders correctly', () => {
    render(<StakingMetricsView7 />);
    expect(screen.getByText('StakingMetrics View 7')).toBeInTheDocument();
  });
});