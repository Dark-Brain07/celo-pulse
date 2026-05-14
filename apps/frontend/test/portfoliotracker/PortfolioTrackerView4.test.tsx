import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView4 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView4';

describe('PortfolioTrackerView4', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView4 />);
    expect(screen.getByText('PortfolioTracker View 4')).toBeInTheDocument();
  });
});