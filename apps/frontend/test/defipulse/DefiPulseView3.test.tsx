import { render, screen } from '@testing-library/react';
import { DefiPulseView3 } from '../../src/features/defipulse/components/DefiPulseView3';

describe('DefiPulseView3', () => {
  it('renders correctly', () => {
    render(<DefiPulseView3 />);
    expect(screen.getByText('DefiPulse View 3')).toBeInTheDocument();
  });
});