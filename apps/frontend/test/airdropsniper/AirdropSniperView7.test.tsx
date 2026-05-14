import { render, screen } from '@testing-library/react';
import { AirdropSniperView7 } from '../../src/features/airdropsniper/components/AirdropSniperView7';

describe('AirdropSniperView7', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView7 />);
    expect(screen.getByText('AirdropSniper View 7')).toBeInTheDocument();
  });
});