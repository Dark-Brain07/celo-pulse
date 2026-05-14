import { render, screen } from '@testing-library/react';
import { DefiPulseView1 } from '../../src/features/defipulse/components/DefiPulseView1';

describe('DefiPulseView1', () => {
  it('renders correctly', () => {
    render(<DefiPulseView1 />);
    expect(screen.getByText('DefiPulse View 1')).toBeInTheDocument();
  });
});