import { render, screen } from '@testing-library/react';
import { DefiPulseView7 } from '../../src/features/defipulse/components/DefiPulseView7';

describe('DefiPulseView7', () => {
  it('renders correctly', () => {
    render(<DefiPulseView7 />);
    expect(screen.getByText('DefiPulse View 7')).toBeInTheDocument();
  });
});