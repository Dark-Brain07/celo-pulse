// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CeloTap
 * @notice Ultra-lightweight interaction contract optimized for minimum gas on Celo L2.
 *         Every function is designed to cost the absolute minimum gas possible
 *         while still producing on-chain proof of activity.
 * 
 * Estimated gas per function:
 *   tap()    → ~21,500 gas (just an event, no storage)
 *   beat()   → ~21,500 gas (just an event, no storage)
 *   signal() → ~21,500 gas (just an event, no storage)
 */
contract CeloTap {

    string public constant PROJECT_ID = "CeloTap-RJ-2026Q2";

    // ── Minimal Events (no storage writes = cheapest possible) ──
    event Tap(address indexed user);
    event Beat(address indexed user);
    event Signal(address indexed user);

    /// @notice Cheapest interaction — just emits an event, no storage writes
    function tap() external {
        emit Tap(msg.sender);
    }

    /// @notice Alternate cheap interaction
    function beat() external {
        emit Beat(msg.sender);
    }

    /// @notice Another alternate cheap interaction
    function signal() external {
        emit Signal(msg.sender);
    }
}
