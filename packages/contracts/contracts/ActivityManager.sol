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
    mapping(address => uint8) public userTier; // 0: Bronze, 1: Silver, 2: Gold, 3: Platinum
    uint256 public totalInteractions;
    
    event ActivityRecorded(address indexed user, uint256 count, uint256 timestamp);
    event TierUpdated(address indexed user, uint8 newTier, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    function recordActivity() external {
        userInteractions[msg.sender] += 1;
        lastInteractionTime[msg.sender] = block.timestamp;
        totalInteractions += 1;
        
        _updateTier(msg.sender);
        
        emit ActivityRecorded(msg.sender, userInteractions[msg.sender], block.timestamp);
    }

    function _updateTier(address user) internal {
        uint256 interactions = userInteractions[user];
        uint8 currentTier = userTier[user];
        uint8 newTier = currentTier;

        if (interactions >= 100 && currentTier < 3) newTier = 3;
        else if (interactions >= 50 && currentTier < 2) newTier = 2;
        else if (interactions >= 10 && currentTier < 1) newTier = 1;

        if (newTier > currentTier) {
            userTier[user] = newTier;
            emit TierUpdated(user, newTier, block.timestamp);
        }
    }

    /**
     * @notice Returns activity stats for a given user
     */
    function getUserStats(address user) external view returns (
        uint256 interactions,
        uint256 lastActive,
        uint8 tier
    ) {
        return (userInteractions[user], lastInteractionTime[user], userTier[user]);
    }
}
