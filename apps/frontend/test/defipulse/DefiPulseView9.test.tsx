import { render, screen } from '@testing-library/react';
import { DefiPulseView9 } from '../../src/features/defipulse/components/DefiPulseView9';

describe('DefiPulseView9', () => {
  it('renders correctly', () => {
    render(<DefiPulseView9 />);
    expect(screen.getByText('DefiPulse View 9')).toBeInTheDocument();
  });
});