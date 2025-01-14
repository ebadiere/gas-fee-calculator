import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../Home';

// Mock the hooks
vi.mock('../../hooks/useEthPrice', () => ({
  useEthPrice: () => 2000
}));

vi.mock('../../hooks/useGasPrices', () => ({
  default: () => ({
    gasData: {
      SafeGasPrice: "20",
      FastGasPrice: "25"
    },
    error: null
  })
}));

describe('Home', () => {
  it('renders the calculator title', () => {
    render(<Home />);
    expect(screen.getByText(/gas fee calculator/i)).toBeInTheDocument();
  });

  it('displays gas prices from API', () => {
    render(<Home />);
    expect(screen.getByText(/suggested safe gas price \(gwei\): 20/i)).toBeInTheDocument();
    expect(screen.getByText(/suggested fast gas price \(gwei\): 25/i)).toBeInTheDocument();
  });

  it('renders the GasFeeForm component', () => {
    render(<Home />);
    expect(screen.getByLabelText(/gas limit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gas price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/eth price/i)).toBeInTheDocument();
  });
});
