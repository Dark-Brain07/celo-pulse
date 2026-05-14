import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView10 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView10';

describe('PortfolioTrackerView10', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView10 />);
    expect(screen.getByText('PortfolioTracker View 10')).toBeInTheDocument();
  });
});