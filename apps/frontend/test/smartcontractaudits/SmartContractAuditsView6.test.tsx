import { render, screen } from '@testing-library/react';
import { SmartContractAuditsView6 } from '../../src/features/smartcontractaudits/components/SmartContractAuditsView6';

describe('SmartContractAuditsView6', () => {
  it('renders correctly', () => {
    render(<SmartContractAuditsView6 />);
    expect(screen.getByText('SmartContractAudits View 6')).toBeInTheDocument();
  });
});