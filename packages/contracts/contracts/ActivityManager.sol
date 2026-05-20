// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ActivityManager
 * @dev Stores activity data on-chain with access control.
 *      Records per-user interaction counts and timestamps.
 */
contract ActivityManager is Ownable, Pausable {
    mapping(address => uint256) public userInteractions;
    mapping(address => uint256) public lastInteractionTime;
    mapping(address => uint8) public userTier; // 0: Bronze, 1: Silver, 2: Gold, 3: Platinum
    uint256 public totalInteractions;
    address public gasPriceOracle;
    
    event ActivityRecorded(address indexed user, uint256 count, uint256 timestamp);
    event TierUpdated(address indexed user, uint8 newTier, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Record a new user on-chain activity.
     * @dev Increments interaction counts, records last active timestamp, and updates tiers dynamically.
     *      Emits an {ActivityRecorded} event on success.
     */
    function recordActivity() external whenNotPaused {
        userInteractions[msg.sender] += 1;
        lastInteractionTime[msg.sender] = block.timestamp;
        totalInteractions += 1;
        
        _updateTier(msg.sender);
        
        emit ActivityRecorded(msg.sender, userInteractions[msg.sender], block.timestamp);
    }

    /**
     * @dev Internal helper function to upgrade a user's tier based on their cumulative interactions.
     *      Tiers range from 0 (Bronze) to 3 (Platinum).
     *      Emits a {TierUpdated} event if a tier promotion occurs.
     * @param user The address of the user to evaluate and update.
     */
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
     * @notice Returns activity stats for a given user.
     * @param user The address of the user to query.
     * @return interactions The total number of registered interactions.
     * @return lastActive The timestamp of the user's last recorded action.
     * @return tier The numerical tier classification of the user.
     */
    function getUserStats(address user) external view returns (
        uint256 interactions,
        uint256 lastActive,
        uint8 tier
    ) {
        return (userInteractions[user], lastInteractionTime[user], userTier[user]);
    }

    // ─── Emergency Admin Controls ───

    /**
     * @notice Emergency trigger to pause active contract modifications.
     * @dev Restricts access to onlyOwner.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Resumes normal contract operations.
     * @dev Restricts access to onlyOwner.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Updates the current on-chain gas price oracle address.
     * @dev Validates that the input address is not zero. Restricts access to onlyOwner.
     * @param _oracle The new gas price oracle address.
     */
    function setGasPriceOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle address");
        gasPriceOracle = _oracle;
    }
}
