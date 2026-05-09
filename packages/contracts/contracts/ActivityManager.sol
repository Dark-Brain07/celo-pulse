// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ActivityManager
 * @dev Stores activity data on-chain with access control.
 *      Records per-user interaction counts and timestamps.
 */
contract ActivityManager is Ownable {
    mapping(address => uint256) public userInteractions;
    mapping(address => uint256) public lastInteractionTime;
    uint256 public totalInteractions;
    
    event ActivityRecorded(address indexed user, uint256 count, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    function recordActivity() external {
        userInteractions[msg.sender] += 1;
        lastInteractionTime[msg.sender] = block.timestamp;
        totalInteractions += 1;
        emit ActivityRecorded(msg.sender, userInteractions[msg.sender], block.timestamp);
    }

    /**
     * @notice Returns activity stats for a given user
     */
    function getUserStats(address user) external view returns (
        uint256 interactions,
        uint256 lastActive
    ) {
        return (userInteractions[user], lastInteractionTime[user]);
    }
}
