import { render, screen } from '@testing-library/react';
import { AirdropSniperView5 } from '../../src/features/airdropsniper/components/AirdropSniperView5';

describe('AirdropSniperView5', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView5 />);
    expect(screen.getByText('AirdropSniper View 5')).toBeInTheDocument();
  });
});