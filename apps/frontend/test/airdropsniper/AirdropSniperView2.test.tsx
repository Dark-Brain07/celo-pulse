import { render, screen } from '@testing-library/react';
import { AirdropSniperView2 } from '../../src/features/airdropsniper/components/AirdropSniperView2';

describe('AirdropSniperView2', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView2 />);
    expect(screen.getByText('AirdropSniper View 2')).toBeInTheDocument();
  });
});