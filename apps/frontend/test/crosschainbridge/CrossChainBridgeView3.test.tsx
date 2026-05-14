import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView3 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView3';

describe('CrossChainBridgeView3', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView3 />);
    expect(screen.getByText('CrossChainBridge View 3')).toBeInTheDocument();
  });
});