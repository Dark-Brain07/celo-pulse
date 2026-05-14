import { render, screen } from '@testing-library/react';
import { AirdropSniperView9 } from '../../src/features/airdropsniper/components/AirdropSniperView9';

describe('AirdropSniperView9', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView9 />);
    expect(screen.getByText('AirdropSniper View 9')).toBeInTheDocument();
  });
});