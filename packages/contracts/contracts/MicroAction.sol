// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MicroAction
 * @dev Extremely optimized contract for absolute lowest gas interactions
 */
contract MicroAction {
    uint256 public pingCount;
    uint256 public constant COOLDOWN = 10 seconds;
    mapping(address => uint256) public lastPing;

    // Emits a tiny log. Costs ~22k gas total. Easiest way to show network activity.
    event Ping(address indexed user, uint256 currentCount);

    function ping() external {
        require(block.timestamp >= lastPing[msg.sender] + COOLDOWN, "MicroAction: Cooldown active");
        
        pingCount += 1;
        lastPing[msg.sender] = block.timestamp;
        
        emit Ping(msg.sender, pingCount);
    }
}
