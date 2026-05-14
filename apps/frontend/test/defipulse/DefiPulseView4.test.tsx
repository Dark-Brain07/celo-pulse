import { render, screen } from '@testing-library/react';
import { DefiPulseView4 } from '../../src/features/defipulse/components/DefiPulseView4';

describe('DefiPulseView4', () => {
  it('renders correctly', () => {
    render(<DefiPulseView4 />);
    expect(screen.getByText('DefiPulse View 4')).toBeInTheDocument();
  });
});