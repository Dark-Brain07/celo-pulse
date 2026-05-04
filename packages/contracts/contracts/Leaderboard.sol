// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Leaderboard
 * @notice On-chain leaderboard for CeloPulse ranking system.
 *         Tracks user scores and maintains top user rankings.
 */
contract Leaderboard is Ownable {
    struct UserScore {
        uint256 score;
        uint256 rank;
        uint256 lastUpdated;
        bool isActive;
    }

    mapping(address => UserScore) public userScores;
    address[] public rankedUsers;
    mapping(address => uint256) private userIndex; // index in rankedUsers

    uint256 public totalRankedUsers;

    // Score weights
    uint256 public constant CHECK_IN_POINTS = 10;
    uint256 public constant TIP_POINTS = 25;
    uint256 public constant ACTION_POINTS = 5;
    uint256 public constant STREAK_BONUS = 50;
    uint256 public constant REFERRAL_POINTS = 100;

    // Events for Blockscout indexing
    event ScoreUpdated(address indexed user, uint256 newScore, uint256 timestamp);
    event RankChanged(address indexed user, uint256 oldRank, uint256 newRank);
    event NewRankedUser(address indexed user, uint256 initialScore);

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Add points to a user's score
     * @param user The user address
     * @param points Points to add
     * @param reason Reason string for the event
     */
    function addPoints(address user, uint256 points, string calldata reason) external {
        if (!userScores[user].isActive) {
            userScores[user].isActive = true;
            userIndex[user] = rankedUsers.length;
            rankedUsers.push(user);
            totalRankedUsers++;
            emit NewRankedUser(user, points);
        }

        userScores[user].score += points;
        userScores[user].lastUpdated = block.timestamp;

        emit ScoreUpdated(user, userScores[user].score, block.timestamp);
    }

    /**
     * @notice Batch add points for check-in
     */
    function recordCheckIn(address user) external {
        _addPointsInternal(user, CHECK_IN_POINTS);
    }

    function recordTip(address user) external {
        _addPointsInternal(user, TIP_POINTS);
    }

    function recordAction(address user) external {
        _addPointsInternal(user, ACTION_POINTS);
    }

    function recordStreakBonus(address user) external {
        _addPointsInternal(user, STREAK_BONUS);
    }

    function recordReferral(address user) external {
        _addPointsInternal(user, REFERRAL_POINTS);
    }

    function _addPointsInternal(address user, uint256 points) internal {
        if (!userScores[user].isActive) {
            userScores[user].isActive = true;
            userIndex[user] = rankedUsers.length;
            rankedUsers.push(user);
            totalRankedUsers++;
            emit NewRankedUser(user, points);
        }

        userScores[user].score += points;
        userScores[user].lastUpdated = block.timestamp;

        emit ScoreUpdated(user, userScores[user].score, block.timestamp);
    }

    // ─── View Functions ───

    function getUserScore(address user) external view returns (uint256 score, uint256 lastUpdated, bool isActive) {
        UserScore storage s = userScores[user];
        return (s.score, s.lastUpdated, s.isActive);
    }

    /**
     * @notice Get top N users by score (computed off-chain sorting, on-chain data)
     * @dev Returns unsorted list — frontend sorts by score
     */
    function getTopUsers(uint256 offset, uint256 limit) external view returns (
        address[] memory users,
        uint256[] memory scores
    ) {
        uint256 end = offset + limit;
        if (end > rankedUsers.length) end = rankedUsers.length;
        uint256 length = end - offset;

        users = new address[](length);
        scores = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address user = rankedUsers[offset + i];
            users[i] = user;
            scores[i] = userScores[user].score;
        }

        return (users, scores);
    }

    function getTotalRankedUsers() external view returns (uint256) {
        return totalRankedUsers;
    }
}
