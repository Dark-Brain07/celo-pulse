import { render, screen } from '@testing-library/react';
import { DefiPulseView2 } from '../../src/features/defipulse/components/DefiPulseView2';

describe('DefiPulseView2', () => {
  it('renders correctly', () => {
    render(<DefiPulseView2 />);
    expect(screen.getByText('DefiPulse View 2')).toBeInTheDocument();
  });
});