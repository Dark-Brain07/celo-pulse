import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView1 } from '../../src/features/governanceproposals/components/GovernanceProposalsView1';

describe('GovernanceProposalsView1', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView1 />);
    expect(screen.getByText('GovernanceProposals View 1')).toBeInTheDocument();
  });
});