# Ethereum Gas Fee Calculator

A React-based web application that helps users calculate Ethereum transaction gas fees in both ETH and USD. The calculator uses real-time data from Etherscan API for gas prices and current ETH/USD exchange rates.

## Features

- Real-time gas price suggestions from Etherscan API
- Live ETH/USD price updates
- Custom gas price input option
- Configurable gas limit
- Calculates fees in both ETH and USD
- Clean, modern React UI with TypeScript

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Etherscan API key:
   ```
   VITE_ETHERSCAN_API_KEY=your_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_ETHERSCAN_API_KEY`: Your Etherscan API key (required for gas price data)

An example `.env` file is provided as `.env.example`:
```bash
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

Copy `.env.example` to `.env` and replace the placeholder with your actual Etherscan API key.

## Project Structure

```
src/
  ├── components/
  │   └── GasFeeForm.tsx    # Form component for gas fee inputs
  ├── hooks/
  │   ├── useEthPrice.ts    # Hook for fetching ETH/USD price
  │   └── useGasPrices.ts   # Hook for fetching gas prices from Etherscan
  └── pages/
      └── Home.tsx          # Main page component
```

The project follows a modular structure with:
- Reusable React components in `components/`
- Custom hooks for data fetching in `hooks/`
- Page components in `pages/`

## Technologies Used

- React 18
- TypeScript
- Vite
- Etherscan API

## Development

This project is built with Vite for fast development and optimal production builds. It uses TypeScript for type safety and React for the UI components.