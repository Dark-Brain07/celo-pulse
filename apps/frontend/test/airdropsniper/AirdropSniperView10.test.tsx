import { render, screen } from '@testing-library/react';
import { AirdropSniperView10 } from '../../src/features/airdropsniper/components/AirdropSniperView10';

describe('AirdropSniperView10', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView10 />);
    expect(screen.getByText('AirdropSniper View 10')).toBeInTheDocument();
  });
});