import React from 'react';

interface GasFeeFormProps {
  gasLimit: number;
  setGasLimit: (value: number) => void;
  gasPrice: number;
  setGasPrice: (value: number) => void;
  ethPrice: number | null;
  setEthPrice: (value: number) => void;
  onCalculate: () => void;
}

const GasFeeForm: React.FC<GasFeeFormProps> = ({
  gasLimit,
  setGasLimit,
  gasPrice,
  setGasPrice,
  ethPrice,
  setEthPrice,
  onCalculate,
}) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <label style={{ display: 'block', marginTop: '0.5rem' }}>
        Gas Limit:
        <input
          type="number"
          value={gasLimit}
          onChange={(e) => setGasLimit(Number(e.target.value))}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>

      <label style={{ display: 'block', marginTop: '0.5rem' }}>
        Gas Price (Gwei):
        <input
          type="number"
          value={gasPrice}
          onChange={(e) => setGasPrice(Number(e.target.value))}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>

      <label style={{ display: 'block', marginTop: '0.5rem' }}>
        ETH Price (USD):
        <input
          type="number"
          value={ethPrice ?? 0}
          onChange={(e) => setEthPrice(Number(e.target.value))}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>

      <button style={{ marginTop: '1rem' }} onClick={onCalculate}>
        Calculate
      </button>
    </div>
  );
};

export default GasFeeForm;
