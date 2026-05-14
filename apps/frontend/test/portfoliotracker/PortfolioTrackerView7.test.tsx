import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView7 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView7';

describe('PortfolioTrackerView7', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView7 />);
    expect(screen.getByText('PortfolioTracker View 7')).toBeInTheDocument();
  });
});