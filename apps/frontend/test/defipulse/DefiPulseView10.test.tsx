import { render, screen } from '@testing-library/react';
import { DefiPulseView10 } from '../../src/features/defipulse/components/DefiPulseView10';

describe('DefiPulseView10', () => {
  it('renders correctly', () => {
    render(<DefiPulseView10 />);
    expect(screen.getByText('DefiPulse View 10')).toBeInTheDocument();
  });
});