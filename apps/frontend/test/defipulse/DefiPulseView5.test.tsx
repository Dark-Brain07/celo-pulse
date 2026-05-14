import { render, screen } from '@testing-library/react';
import { DefiPulseView5 } from '../../src/features/defipulse/components/DefiPulseView5';

describe('DefiPulseView5', () => {
  it('renders correctly', () => {
    render(<DefiPulseView5 />);
    expect(screen.getByText('DefiPulse View 5')).toBeInTheDocument();
  });
});