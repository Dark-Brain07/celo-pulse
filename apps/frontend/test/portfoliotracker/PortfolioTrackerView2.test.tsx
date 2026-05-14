import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView2 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView2';

describe('PortfolioTrackerView2', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView2 />);
    expect(screen.getByText('PortfolioTracker View 2')).toBeInTheDocument();
  });
});