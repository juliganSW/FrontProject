// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleDEX
 * @dev This contract implements a simple decentralized exchange (DEX) that allows users to add/remove liquidity and swap tokens.
 * The contract supports two ERC20 tokens and provides basic functionality for token swapping.
 */
contract SimpleDEX is Ownable {

    // ERC20 token A
    IERC20 public tokenA;

    // ERC20 token B
    IERC20 public tokenB;

    constructor(IERC20 _tokenA, IERC20 _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    // Event emitted when liquidity is added to the pool
    /**
     * @notice Emitted when liquidity is added to the pool.
     * @param amountA The amount of token A added to the pool.
     * @param amountB The amount of token B added to the pool.
     */
    event LiquidityAdded(uint256 amountA, uint256 amountB);

    // Event emitted when liquidity is removed from the pool
    /**
     * @notice Emitted when liquidity is removed from the pool.
     * @param amountA The amount of token A removed from the pool.
     * @param amountB The amount of token B removed from the pool.
     */
    event LiquidityRemoved(uint256 amountA, uint256 amountB);

    // Event emitted when a token swap occurs
    /**
     * @notice Emitted when a swap is made between token A and token B.
     * @param user The address of the user who initiated the swap.
     * @param amountIn The amount of input token (A or B) sent by the user.
     * @param amountOut The amount of output token (B or A) received by the user.
     */
    event TokenSwapped(address indexed user, uint256 amountIn, uint256 amountOut);

    /**
     * @notice Adds liquidity to the pool.
     * @dev Only the owner can add liquidity to the pool.
     * @param amountA The amount of token A to add to the pool.
     * @param amountB The amount of token B to add to the pool.
     * @dev Emits a LiquidityAdded event.
     */
    function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(amountA > 0 && amountB > 0, "Liquidity amounts must be > 0");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        emit LiquidityAdded(amountA, amountB);
    }

    /**
     * @notice Swaps token A for token B.
     * @dev This function performs the swap from token A to token B based on the current pool reserves.
     * @param amountAIn The amount of token A to swap.
     * @dev Emits a TokenSwapped event.
     */
    function swapAforB(uint256 amountAIn) external {
        require(amountAIn > 0, "Amount must be > 0");

        uint256 amountBOut = getAmountOut(amountAIn, tokenA.balanceOf(address(this)), tokenB.balanceOf(address(this)));

        tokenA.transferFrom(msg.sender, address(this), amountAIn);
        tokenB.transfer(msg.sender, amountBOut);

        emit TokenSwapped(msg.sender, amountAIn, amountBOut);
    }

    /**
     * @notice Swaps token B for token A.
     * @dev This function performs the swap from token B to token A based on the current pool reserves.
     * @param amountBIn The amount of token B to swap.
     * @dev Emits a TokenSwapped event.
     */
    function swapBforA(uint256 amountBIn) external {
        require(amountBIn > 0, "Amount must be > 0");

        uint256 amountAOut = getAmountOut(amountBIn, tokenB.balanceOf(address(this)), tokenA.balanceOf(address(this)));

        tokenB.transferFrom(msg.sender, address(this), amountBIn);
        tokenA.transfer(msg.sender, amountAOut);

        emit TokenSwapped(msg.sender, amountBIn, amountAOut);
    }

    /**
     * @notice Removes liquidity from the pool.
     * @dev Only the owner can remove liquidity from the pool.
     * @param amountA The amount of token A to remove from the pool.
     * @param amountB The amount of token B to remove from the pool.
     * @dev Emits a LiquidityRemoved event.
     */
    function removeLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(amountA <= tokenA.balanceOf(address(this)) && amountB <= tokenB.balanceOf(address(this)), "Not enough liquidity available");

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        emit LiquidityRemoved(amountA, amountB);
    }

    /**
     * @notice Gets the current price of a token in the pool.
     * @dev The price is calculated based on the current reserves of token A and token B.
     * @param _token The address of the token to get the price for (either tokenA or tokenB).
     * @return The price of the token in terms of the other token (scaled by 1e18).
     * @dev Reverts if the token address is not valid.
     */
    function getPrice(address _token) external view returns (uint256) {
        require(_token == address(tokenA) || _token == address(tokenB), "Not valid token");

        return _token == address(tokenA)
            ? (tokenB.balanceOf(address(this)) * 1e18) / tokenA.balanceOf(address(this))
            : (tokenA.balanceOf(address(this)) * 1e18) / tokenB.balanceOf(address(this));
    }

    /**
     * @notice Calculates the output amount of tokens for a given input.
     * @dev This function uses the constant product formula to calculate the output amount.
     * @param amountIn The amount of input token.
     * @param reserveIn The current reserve of the input token in the pool.
     * @param reserveOut The current reserve of the output token in the pool.
     * @return The output amount of tokens.
     */
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) private pure returns (uint256) {
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
}