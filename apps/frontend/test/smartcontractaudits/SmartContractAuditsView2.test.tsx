import { render, screen } from '@testing-library/react';
import { SmartContractAuditsView2 } from '../../src/features/smartcontractaudits/components/SmartContractAuditsView2';

describe('SmartContractAuditsView2', () => {
  it('renders correctly', () => {
    render(<SmartContractAuditsView2 />);
    expect(screen.getByText('SmartContractAudits View 2')).toBeInTheDocument();
  });
});