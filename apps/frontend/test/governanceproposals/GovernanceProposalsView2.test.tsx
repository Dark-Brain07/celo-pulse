import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView2 } from '../../src/features/governanceproposals/components/GovernanceProposalsView2';

describe('GovernanceProposalsView2', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView2 />);
    expect(screen.getByText('GovernanceProposals View 2')).toBeInTheDocument();
  });
});