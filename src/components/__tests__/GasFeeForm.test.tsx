import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GasFeeForm from '../GasFeeForm';

describe('GasFeeForm', () => {
  const defaultProps = {
    gasLimit: 21000,
    setGasLimit: vi.fn(),
    gasPrice: 5,
    setGasPrice: vi.fn(),
    ethPrice: 2000,
    setEthPrice: vi.fn(),
    onCalculate: vi.fn(),
  };

  it('renders all form inputs', () => {
    render(<GasFeeForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/gas limit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gas price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/eth price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  it('calls setGasLimit when gas limit input changes', () => {
    render(<GasFeeForm {...defaultProps} />);
    
    const input = screen.getByLabelText(/gas limit/i);
    fireEvent.change(input, { target: { value: '30000' } });
    
    expect(defaultProps.setGasLimit).toHaveBeenCalledWith(30000);
  });

  it('calls onCalculate when calculate button is clicked', () => {
    render(<GasFeeForm {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /calculate/i });
    fireEvent.click(button);
    
    expect(defaultProps.onCalculate).toHaveBeenCalled();
  });

  it('handles null ethPrice correctly', () => {
    render(<GasFeeForm {...defaultProps} ethPrice={null} />);
    
    const input = screen.getByLabelText(/eth price/i);
    expect(input).toHaveValue(0);
  });
});
