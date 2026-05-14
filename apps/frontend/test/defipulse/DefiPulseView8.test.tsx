import { render, screen } from '@testing-library/react';
import { DefiPulseView8 } from '../../src/features/defipulse/components/DefiPulseView8';

describe('DefiPulseView8', () => {
  it('renders correctly', () => {
    render(<DefiPulseView8 />);
    expect(screen.getByText('DefiPulse View 8')).toBeInTheDocument();
  });
});