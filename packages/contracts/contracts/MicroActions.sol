// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MicroActions
 * @notice Lightweight micro-transaction contract for CeloPulse.
 *         Designed to generate maximum onchain activity through small, frequent transactions.
 */
contract MicroActions is ReentrancyGuard {
    struct ActionStats {
        uint256 tipsSent;
        uint256 tipsReceived;
        uint256 totalTipAmount;
        uint256 actionsPlayed;
        uint256 lastActionTime;
    }

    mapping(address => ActionStats) public userStats;

    uint256 public totalTips;
    uint256 public totalTipVolume;
    uint256 public totalActions;
    uint256 public constant ACTION_COOLDOWN = 30 seconds; // Very short — encourages frequent play

    // Events for Blockscout indexing
    event TipSent(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
    event ActionPerformed(address indexed user, string actionType, uint256 timestamp);
    event ActionCombo(address indexed user, uint256 comboCount, uint256 timestamp);

    /**
     * @notice Send a micro-tip to another user — 1 tx
     * @param recipient The address to tip
     */
    function sendTip(address payable recipient) external payable nonReentrant {
        require(msg.value > 0, "CeloPulse: Tip must be > 0");
        require(recipient != msg.sender, "CeloPulse: Cannot tip yourself");
        require(recipient != address(0), "CeloPulse: Invalid recipient");

        userStats[msg.sender].tipsSent++;
        userStats[msg.sender].totalTipAmount += msg.value;
        userStats[recipient].tipsReceived++;

        totalTips++;
        totalTipVolume += msg.value;

        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "CeloPulse: Tip transfer failed");

        emit TipSent(msg.sender, recipient, msg.value, block.timestamp);
        emit ActionPerformed(msg.sender, "TIP", block.timestamp);
    }

    /**
     * @notice Play a micro-action — lightweight tx for activity generation
     * @dev 30-second cooldown enables multiple plays per session (target: 5-10 per session)
     */
    function playAction() external {
        require(
            block.timestamp >= userStats[msg.sender].lastActionTime + ACTION_COOLDOWN,
            "CeloPulse: Action cooldown active"
        );

        userStats[msg.sender].actionsPlayed++;
        userStats[msg.sender].lastActionTime = block.timestamp;
        totalActions++;

        emit ActionPerformed(msg.sender, "PLAY", block.timestamp);

        // Combo bonus events
        if (userStats[msg.sender].actionsPlayed % 5 == 0) {
            emit ActionCombo(
                msg.sender,
                userStats[msg.sender].actionsPlayed,
                block.timestamp
            );
        }
    }

    /**
     * @notice Quick react action — even lighter, generates activity
     */
    function quickReact(uint8 reactionType) external {
        require(reactionType > 0 && reactionType <= 5, "CeloPulse: Invalid reaction");
        require(
            block.timestamp >= userStats[msg.sender].lastActionTime + ACTION_COOLDOWN,
            "CeloPulse: Cooldown active"
        );

        userStats[msg.sender].actionsPlayed++;
        userStats[msg.sender].lastActionTime = block.timestamp;
        totalActions++;

        emit ActionPerformed(msg.sender, "REACT", block.timestamp);
    }

    // ─── View Functions ───

    function getUserStats(address user) external view returns (
        uint256 tipsSent,
        uint256 tipsReceived,
        uint256 tipAmount,
        uint256 actionsPlayed,
        uint256 lastAction
    ) {
        ActionStats storage s = userStats[user];
        return (s.tipsSent, s.tipsReceived, s.totalTipAmount, s.actionsPlayed, s.lastActionTime);
    }

    function canPlayAction(address user) external view returns (bool) {
        return block.timestamp >= userStats[user].lastActionTime + ACTION_COOLDOWN;
    }

    function getGlobalStats() external view returns (
        uint256 tips,
        uint256 volume,
        uint256 actions
    ) {
        return (totalTips, totalTipVolume, totalActions);
    }
}
