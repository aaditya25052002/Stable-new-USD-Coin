# nUSD Stablecoin

This project is a simple example of a Stablecoin pegged to USD, built on the Ethereum blockchain using Solidity. It leverages the Chainlink price feed to get the current price of Ethereum in USD.

## Smart Contract: nUSD

This smart contract creates a token called nUSD which is pegged to the USD. It includes functions to deposit ETH and mint nUSD in return, and to redeem nUSD and get back ETH. It also allows the admin of the contract to withdraw ETH.

## Functions

- `constructor`: Sets up the price feed and the admin of the contract.

- `getLatestETHUSDPrice`: Gets the latest ETH/USD price from the Chainlink price feed.

- `depositETH`: Allows a user to deposit ETH and mint nUSD in return. The amount of nUSD is determined by the current ETH/USD price.

- `redeem`: Allows a user to redeem their nUSD and get back ETH. The amount of ETH is determined by the current ETH/USD price.

- `withdrawETH`: Allows the admin of the contract to withdraw ETH from the contract.

## Getting Started

### Prerequisites

- Install Node.js and npm. You can download them [here](https://nodejs.org/en/download/).

```
npm install 
npm run dev 
```

### Deployment

 Use the contract in text file in folder "Contracts and tests/test" and use remix ide.

### Running Tests

 use the txt file in the folder "Contracts and tests/test" and use remix ide to test the contract

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenZeppelin for the ERC20 contract.
- Chainlink for the AggregatorV3Interface.