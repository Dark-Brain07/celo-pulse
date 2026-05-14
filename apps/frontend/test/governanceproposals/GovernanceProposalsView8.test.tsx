import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView8 } from '../../src/features/governanceproposals/components/GovernanceProposalsView8';

describe('GovernanceProposalsView8', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView8 />);
    expect(screen.getByText('GovernanceProposals View 8')).toBeInTheDocument();
  });
});