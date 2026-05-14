import { render, screen } from '@testing-library/react';
import { SmartContractAuditsView8 } from '../../src/features/smartcontractaudits/components/SmartContractAuditsView8';

describe('SmartContractAuditsView8', () => {
  it('renders correctly', () => {
    render(<SmartContractAuditsView8 />);
    expect(screen.getByText('SmartContractAudits View 8')).toBeInTheDocument();
  });
});