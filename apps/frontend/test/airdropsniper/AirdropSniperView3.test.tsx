import { render, screen } from '@testing-library/react';
import { AirdropSniperView3 } from '../../src/features/airdropsniper/components/AirdropSniperView3';

describe('AirdropSniperView3', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView3 />);
    expect(screen.getByText('AirdropSniper View 3')).toBeInTheDocument();
  });
});