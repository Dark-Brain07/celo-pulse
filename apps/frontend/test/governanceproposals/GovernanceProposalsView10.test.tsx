import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView10 } from '../../src/features/governanceproposals/components/GovernanceProposalsView10';

describe('GovernanceProposalsView10', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView10 />);
    expect(screen.getByText('GovernanceProposals View 10')).toBeInTheDocument();
  });
});