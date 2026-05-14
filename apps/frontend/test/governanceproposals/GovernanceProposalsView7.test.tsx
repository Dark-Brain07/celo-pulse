import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView7 } from '../../src/features/governanceproposals/components/GovernanceProposalsView7';

describe('GovernanceProposalsView7', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView7 />);
    expect(screen.getByText('GovernanceProposals View 7')).toBeInTheDocument();
  });
});