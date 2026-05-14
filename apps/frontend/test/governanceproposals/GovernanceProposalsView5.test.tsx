import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView5 } from '../../src/features/governanceproposals/components/GovernanceProposalsView5';

describe('GovernanceProposalsView5', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView5 />);
    expect(screen.getByText('GovernanceProposals View 5')).toBeInTheDocument();
  });
});