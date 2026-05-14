import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView5 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView5';

describe('PortfolioTrackerView5', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView5 />);
    expect(screen.getByText('PortfolioTracker View 5')).toBeInTheDocument();
  });
});