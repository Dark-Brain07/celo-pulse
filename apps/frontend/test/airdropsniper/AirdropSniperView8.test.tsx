import { render, screen } from '@testing-library/react';
import { AirdropSniperView8 } from '../../src/features/airdropsniper/components/AirdropSniperView8';

describe('AirdropSniperView8', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView8 />);
    expect(screen.getByText('AirdropSniper View 8')).toBeInTheDocument();
  });
});