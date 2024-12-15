# SimpleDEX Smart Contract

## Overview

SimpleDEX is a decentralized exchange (DEX) contract that allows users to trade between two ERC20 tokens. This contract is designed for educational purposes and demonstrates how to create a simple DEX on the Ethereum blockchain.

---

## Features
- Mint TokenA and TokenB
- Swap TokenA for TokenB and vice versa
- Add and remove liquidity
- Check token balances and allowances
- Fetch token prices


---

## Contract Details

- **Name:** SimpleDEX
- **Constructor Parameters:**
  - `IERC20 _tokenA`: Address of the first ERC20 token.
  - `IERC20 _tokenB`: Address of the second ERC20 token.

The contract initializes with two tokens and manages their swaps based on the provided liquidity.

---

## Requirements

### Tools
- Html
- Css
- Node.js (v16 or later recommended)
- Hardhat (Ethereum development environment)
- OpenZeppelin Contracts (for `IERC20` interface)

### Dependencies
Install the required libraries using:

```bash
npm install @nomicfoundation/hardhat-ignition @openzeppelin/contracts ethers hardhat

License
This project is licensed under the MIT License.

### Key Notes:
- **Clarity:** The instructions are straightforward for anyone with basic blockchain and Hardhat knowledge.
- **Modularity:** Includes steps for deployment and testing, as well as clear parameter instructions.  
