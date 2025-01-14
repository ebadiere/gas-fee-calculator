import { useState, useEffect } from 'react';

interface GasOracleResult {
  SafeGasPrice: string; // e.g. "10"
  ProposeGasPrice: string; // e.g. "15"
  FastGasPrice: string; // e.g. "20"
}

interface EtherscanGasOracle {
  status: string;
  message: string;
  result: GasOracleResult;
}

interface UseGasPricesReturn {
  gasData: GasOracleResult | null;
  error: string | null;
}

export default function useGasPrices(apiKey: string): UseGasPricesReturn {
  const [gasData, setGasData] = useState<GasOracleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGasPrices() {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`
        );
        const data = (await response.json()) as EtherscanGasOracle;
        if (data.status === '1') {
          setGasData(data.result);
        } else {
          // If status isn't '1', it's an error from Etherscan
          setError(data.message || 'Unknown error fetching gas prices');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }

    fetchGasPrices();
  }, [apiKey]);

  return { gasData, error };
}
