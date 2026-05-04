// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MicroAction
 * @dev Extremely optimized contract for absolute lowest gas interactions
 */
contract MicroAction {
    uint256 public pingCount;

    // Emits a tiny log. Costs ~22k gas total. Easiest way to show network activity.
    event Ping(address indexed user);

    function ping() external {
        emit Ping(msg.sender);
    }
}
