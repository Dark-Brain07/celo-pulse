import { render, screen } from '@testing-library/react';
import { AirdropSniperView1 } from '../../src/features/airdropsniper/components/AirdropSniperView1';

describe('AirdropSniperView1', () => {
  it('renders correctly', () => {
    render(<AirdropSniperView1 />);
    expect(screen.getByText('AirdropSniper View 1')).toBeInTheDocument();
  });
});