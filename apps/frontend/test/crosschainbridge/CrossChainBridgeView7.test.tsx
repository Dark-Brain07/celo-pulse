import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView7 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView7';

describe('CrossChainBridgeView7', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView7 />);
    expect(screen.getByText('CrossChainBridge View 7')).toBeInTheDocument();
  });
});