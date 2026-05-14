import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView6 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView6';

describe('PortfolioTrackerView6', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView6 />);
    expect(screen.getByText('PortfolioTracker View 6')).toBeInTheDocument();
  });
});