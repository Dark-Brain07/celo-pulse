import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView5 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView5';

describe('CrossChainBridgeView5', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView5 />);
    expect(screen.getByText('CrossChainBridge View 5')).toBeInTheDocument();
  });
});