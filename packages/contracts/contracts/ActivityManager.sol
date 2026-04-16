// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ActivityManager
 * @dev Stores activity data on-chain. Costs slightly more gas due to storage.
 */
contract ActivityManager {
    mapping(address => uint256) public userInteractions;
    uint256 public totalInteractions;
    
    event ActivityRecorded(address indexed user, uint256 count);

    function recordActivity() external {
        userInteractions[msg.sender] += 1;
        totalInteractions += 1;
        emit ActivityRecorded(msg.sender, userInteractions[msg.sender]);
    }
}
