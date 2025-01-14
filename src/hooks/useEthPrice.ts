import { useState, useEffect } from 'react';

interface CoinGeckoPriceResponse {
  ethereum: { usd: number };
}

export function useEthPrice(): number | null {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = (await response.json()) as CoinGeckoPriceResponse;
        setPrice(data.ethereum.usd);
      } catch (err) {
        console.error('Failed to fetch ETH price:', err);
      }
    }

    fetchPrice();
  }, []);

  return price;
}