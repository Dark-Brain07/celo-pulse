import { render, screen } from '@testing-library/react';
import { DefiPulseView6 } from '../../src/features/defipulse/components/DefiPulseView6';

describe('DefiPulseView6', () => {
  it('renders correctly', () => {
    render(<DefiPulseView6 />);
    expect(screen.getByText('DefiPulse View 6')).toBeInTheDocument();
  });
});