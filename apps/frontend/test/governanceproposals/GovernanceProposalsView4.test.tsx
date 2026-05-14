import { render, screen } from '@testing-library/react';
import { GovernanceProposalsView4 } from '../../src/features/governanceproposals/components/GovernanceProposalsView4';

describe('GovernanceProposalsView4', () => {
  it('renders correctly', () => {
    render(<GovernanceProposalsView4 />);
    expect(screen.getByText('GovernanceProposals View 4')).toBeInTheDocument();
  });
});