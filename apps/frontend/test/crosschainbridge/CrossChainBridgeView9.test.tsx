import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView9 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView9';

describe('CrossChainBridgeView9', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView9 />);
    expect(screen.getByText('CrossChainBridge View 9')).toBeInTheDocument();
  });
});