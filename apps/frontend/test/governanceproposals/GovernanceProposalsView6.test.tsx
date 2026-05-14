import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView6 } from '../../src/features/governanceproposals/components/GovernanceProposalsView6';

describe('GovernanceProposalsView6', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView6 />);
    expect(screen.getByText('GovernanceProposals View 6')).toBeInTheDocument();
  });
});