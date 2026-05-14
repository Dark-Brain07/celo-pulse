import { render, screen } from '@testing-library/react';
import { SmartContractAuditsView3 } from '../../src/features/smartcontractaudits/components/SmartContractAuditsView3';

describe('SmartContractAuditsView3', () => {
  it('renders correctly', () => {
    render(<SmartContractAuditsView3 />);
    expect(screen.getByText('SmartContractAudits View 3')).toBeInTheDocument();
  });
});