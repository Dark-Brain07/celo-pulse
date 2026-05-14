import { render, screen } from '@testing-library/react';
import { SmartContractAuditsView4 } from '../../src/features/smartcontractaudits/components/SmartContractAuditsView4';

describe('SmartContractAuditsView4', () => {
  it('renders correctly', () => {
    render(<SmartContractAuditsView4 />);
    expect(screen.getByText('SmartContractAudits View 4')).toBeInTheDocument();
  });
});