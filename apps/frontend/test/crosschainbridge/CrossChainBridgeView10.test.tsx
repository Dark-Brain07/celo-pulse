import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView10 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView10';

describe('CrossChainBridgeView10', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView10 />);
    expect(screen.getByText('CrossChainBridge View 10')).toBeInTheDocument();
  });
});