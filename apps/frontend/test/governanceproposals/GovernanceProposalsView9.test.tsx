import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView9 } from '../../src/features/governanceproposals/components/GovernanceProposalsView9';

describe('GovernanceProposalsView9', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView9 />);
    expect(screen.getByText('GovernanceProposals View 9')).toBeInTheDocument();
  });
});