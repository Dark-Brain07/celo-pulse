import { render, screen } from '@testing-library/react';
import { AirdropSniperView6 } from '../../src/features/airdropsniper/components/AirdropSniperView6';

describe('AirdropSniperView6', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView6 />);
    expect(screen.getByText('AirdropSniper View 6')).toBeInTheDocument();
  });
});