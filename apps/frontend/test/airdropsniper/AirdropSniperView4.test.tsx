import { render, screen } from '@testing-library/react';
import { AirdropSniperView4 } from '../../src/features/airdropsniper/components/AirdropSniperView4';

describe('AirdropSniperView4', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView4 />);
    expect(screen.getByText('AirdropSniper View 4')).toBeInTheDocument();
  });
});