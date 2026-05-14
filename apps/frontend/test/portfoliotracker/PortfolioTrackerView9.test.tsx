import { render, screen } from '@testing-library/react';
import { PortfolioTrackerView9 } from '../../src/features/portfoliotracker/components/PortfolioTrackerView9';

describe('PortfolioTrackerView9', () => {
  it('renders correctly', () => {
    render(<PortfolioTrackerView9 />);
    expect(screen.getByText('PortfolioTracker View 9')).toBeInTheDocument();
  });
});