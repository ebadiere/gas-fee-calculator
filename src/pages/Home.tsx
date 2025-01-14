import React, { useEffect, useState } from "react";
import { useEthPrice } from "../hooks/useEthPrice";
import useGasPrices from "../hooks/useGasPrices";
import GasFeeForm from "../components/GasFeeForm";

const Home: React.FC = () => {
  const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;
  const { gasData, error } = useGasPrices(apiKey);

  // Define state with explicit types
  const [gasLimit, setGasLimit] = useState<number>(21000);
  const [customGwei, setCustomGwei] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<number>(5); // Gwei
  const [calculatedFee, setCalculatedFee] = useState<{
    feeEth: number;
    feeUsd: number;
  } | null>(null);

  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const ethPriceFromHook = useEthPrice();

  useEffect(() => {
    if (ethPriceFromHook !== null) {
      setEthPrice(ethPriceFromHook);
    }
  }, [ethPriceFromHook]);

  const handleCalculate = () => {
    // If the user hasn't entered a custom Gwei, fallback to the SafeGasPrice from the API
    const gwei =
      customGwei > 0 ? customGwei : gasData ? Number(gasData.SafeGasPrice) : 5; // fallback if gasData is null

    // Basic calculation: Gas Fee (ETH) = gasLimit * gasPrice * 1e-9
    const feeEth = gasLimit * gasPrice * 1e-9;

    // Convert ETH to USD
    const feeUsd = feeEth * (ethPrice as number);

    setCalculatedFee({ feeEth, feeUsd });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gas Fee Calculator</h1>

      {error && (
        <p style={{ color: "red" }}>Error fetching gas data: {error}</p>
      )}
      {gasData ? (
        <div>
          <p>Suggested Safe Gas Price (Gwei): {gasData.SafeGasPrice}</p>
          <p>Suggested Fast Gas Price (Gwei): {gasData.FastGasPrice}</p>
        </div>
      ) : (
        <p>Loading gas price data...</p>
      )}

      <GasFeeForm
        gasLimit={gasLimit}
        setGasLimit={setGasLimit}
        gasPrice={gasPrice}
        setGasPrice={setGasPrice}
        ethPrice={ethPrice}
        setEthPrice={setEthPrice}
        onCalculate={handleCalculate}
      />

      {calculatedFee && (
        <div style={{ marginTop: "1rem" }}>
          <p>Estimated Gas Fee: {calculatedFee.feeEth.toFixed(6)} ETH</p>
          <p>≈ ${calculatedFee.feeUsd.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
