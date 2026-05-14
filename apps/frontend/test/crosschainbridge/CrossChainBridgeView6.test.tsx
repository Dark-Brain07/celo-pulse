import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView6 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView6';

describe('CrossChainBridgeView6', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView6 />);
    expect(screen.getByText('CrossChainBridge View 6')).toBeInTheDocument();
  });
});