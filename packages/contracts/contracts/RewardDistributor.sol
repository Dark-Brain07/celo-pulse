// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RewardDistributor
 * @notice Manages reward pool and distribution for CeloPulse users.
 *         Users earn rewards through activity, claimable after meeting thresholds.
 */
contract RewardDistributor is Ownable, ReentrancyGuard {
    struct UserRewards {
        uint256 totalClaimed;
        uint256 pendingReward;
        uint256 lastClaimTime;
        uint256 claimCount;
    }

    mapping(address => UserRewards) public userRewards;

    uint256 public rewardPool;
    uint256 public totalDistributed;
    uint256 public totalClaims;
    uint256 public rewardPerAction;
    uint256 public minClaimThreshold;
    uint256 public claimCooldown;

    // Events for Blockscout indexing
    event RewardClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event RewardAccrued(address indexed user, uint256 amount);
    event PoolFunded(address indexed funder, uint256 amount);
    event RewardConfigUpdated(uint256 rewardPerAction, uint256 minThreshold, uint256 cooldown);

    constructor() Ownable(msg.sender) {
        rewardPerAction = 0.0001 ether;   // Small reward per action
        minClaimThreshold = 0.001 ether;  // Min amount to claim
        claimCooldown = 12 hours;         // Claim twice per day
    }

    /**
     * @notice Fund the reward pool
     */
    receive() external payable {
        rewardPool += msg.value;
        emit PoolFunded(msg.sender, msg.value);
    }

    function fundPool() external payable {
        rewardPool += msg.value;
        emit PoolFunded(msg.sender, msg.value);
    }

    /**
     * @notice Accrue reward for a user (called by other contracts after actions)
     */
    function accrueReward(address user) external {
        userRewards[user].pendingReward += rewardPerAction;
        emit RewardAccrued(user, rewardPerAction);
    }

    /**
     * @notice Claim accumulated rewards — generates 1 tx
     */
    function claimReward() external nonReentrant {
        UserRewards storage rewards = userRewards[msg.sender];

        require(rewards.pendingReward >= minClaimThreshold, "CeloPulse: Below claim threshold");
        require(
            block.timestamp >= rewards.lastClaimTime + claimCooldown,
            "CeloPulse: Claim cooldown active"
        );
        require(rewardPool >= rewards.pendingReward, "CeloPulse: Insufficient reward pool");

        uint256 amount = rewards.pendingReward;
        rewards.pendingReward = 0;
        rewards.totalClaimed += amount;
        rewards.lastClaimTime = block.timestamp;
        rewards.claimCount++;

        rewardPool -= amount;
        totalDistributed += amount;
        totalClaims++;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "CeloPulse: Transfer failed");

        emit RewardClaimed(msg.sender, amount, block.timestamp);
    }

    // ─── View Functions ───

    function getUserRewardInfo(address user) external view returns (
        uint256 totalClaimed,
        uint256 pending,
        uint256 lastClaim,
        uint256 claims,
        bool canClaim
    ) {
        UserRewards storage r = userRewards[user];
        bool eligible = r.pendingReward >= minClaimThreshold
            && block.timestamp >= r.lastClaimTime + claimCooldown
            && rewardPool >= r.pendingReward;
        return (r.totalClaimed, r.pendingReward, r.lastClaimTime, r.claimCount, eligible);
    }

    function canUserClaim(address user) external view returns (bool) {
        UserRewards storage r = userRewards[user];
        return r.pendingReward >= minClaimThreshold
            && block.timestamp >= r.lastClaimTime + claimCooldown
            && rewardPool >= r.pendingReward;
    }

    // ─── Admin Functions ───

    function setRewardConfig(
        uint256 _rewardPerAction,
        uint256 _minThreshold,
        uint256 _cooldown
    ) external onlyOwner {
        rewardPerAction = _rewardPerAction;
        minClaimThreshold = _minThreshold;
        claimCooldown = _cooldown;
        emit RewardConfigUpdated(_rewardPerAction, _minThreshold, _cooldown);
    }
}
