import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView8 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView8';

describe('PortfolioTrackerView8', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView8 />);
    expect(screen.getByText('PortfolioTracker View 8')).toBeInTheDocument();
  });
});