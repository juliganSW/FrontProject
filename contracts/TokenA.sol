// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenA
 * @dev This contract implements a custom ERC20 token named TokenA. 
 * It allows the owner to mint new tokens and provides basic ERC20 functionality.
 */
contract TokenA is ERC20, Ownable {

    /**
     * @notice Constructor that initializes the token with a name and symbol.
     * It mints an initial supply of 10,000 TokenA tokens to the owner's address.
     */
    constructor()
        ERC20("TokenA", "TKNA")
    {
        // Mint an initial supply of 10,000 tokens to the owner's address
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    /**
     * @notice Allows the owner to mint new tokens.
     * @dev This function can only be called by the owner of the contract.
     * @param to The address that will receive the newly minted tokens.
     * @param amount The amount of tokens to mint.
     * @dev Emits a Transfer event for the newly minted tokens.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}