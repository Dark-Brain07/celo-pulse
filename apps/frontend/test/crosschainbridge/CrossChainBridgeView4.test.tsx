import { render, screen } from '@testing-library/react';
import { CrossChainBridgeView4 } from '../../src/features/crosschainbridge/components/CrossChainBridgeView4';

describe('CrossChainBridgeView4', () => {
  it('renders correctly', () => {
    render(<CrossChainBridgeView4 />);
    expect(screen.getByText('CrossChainBridge View 4')).toBeInTheDocument();
  });
});