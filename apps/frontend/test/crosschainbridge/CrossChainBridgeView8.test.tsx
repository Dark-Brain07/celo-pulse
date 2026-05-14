import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView8 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView8';

describe('CrossChainBridgeView8', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView8 />);
    expect(screen.getByText('CrossChainBridge View 8')).toBeInTheDocument();
  });
});