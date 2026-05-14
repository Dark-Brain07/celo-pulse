import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView3 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView3';

describe('PortfolioTrackerView3', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView3 />);
    expect(screen.getByText('PortfolioTracker View 3')).toBeInTheDocument();
  });
});