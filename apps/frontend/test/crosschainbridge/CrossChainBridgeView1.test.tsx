import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView1 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView1';

describe('CrossChainBridgeView1', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView1 />);
    expect(screen.getByText('CrossChainBridge View 1')).toBeInTheDocument();
  });
});