import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView3 } from '../../src/features/governanceproposals/components/GovernanceProposalsView3';

describe('GovernanceProposalsView3', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView3 />);
    expect(screen.getByText('GovernanceProposals View 3')).toBeInTheDocument();
  });
});