import { render, screen } from '@testing-library/react';
import { SmartContractAuditsView1 } from '../../src/features/smartcontractaudits/components/SmartContractAuditsView1';

describe('SmartContractAuditsView1', () => {
  it('renders correctly', () => {
    render(<SmartContractAuditsView1 />);
    expect(screen.getByText('SmartContractAudits View 1')).toBeInTheDocument();
  });
});