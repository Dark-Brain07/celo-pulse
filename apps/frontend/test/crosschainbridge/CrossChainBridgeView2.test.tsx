import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView2 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView2';

describe('CrossChainBridgeView2', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView2 />);
    expect(screen.getByText('CrossChainBridge View 2')).toBeInTheDocument();
  });
});