import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView1 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView1';

describe('PortfolioTrackerView1', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView1 />);
    expect(screen.getByText('PortfolioTracker View 1')).toBeInTheDocument();
  });
});