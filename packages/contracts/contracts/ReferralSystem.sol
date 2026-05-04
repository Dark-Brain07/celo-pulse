// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ReferralSystem
 * @notice Tracks referrals and rewards both inviter and invitee.
 *         Designed to drive organic user growth and increase unique wallet interactions.
 */
contract ReferralSystem is Ownable, ReentrancyGuard {
    struct ReferralInfo {
        address referrer;
        uint256 referralCount;
        uint256 totalEarned;
        uint256 joinedAt;
        bool hasReferred;
    }

    mapping(address => ReferralInfo) public referrals;
    mapping(address => address[]) public referredUsers;
    mapping(address => bool) public isRegistered;

    uint256 public totalReferrals;
    uint256 public totalRegistered;
    uint256 public referrerReward;
    uint256 public refereeReward;
    uint256 public rewardPool;

    // Events for Blockscout indexing
    event UserRegistered(address indexed user, address indexed referrer, uint256 timestamp);
    event ReferralRewardPaid(address indexed referrer, address indexed referee, uint256 amount, uint256 timestamp);
    event PoolFunded(address indexed funder, uint256 amount);

    constructor() Ownable(msg.sender) {
        referrerReward = 0.0005 ether; // Reward for inviter
        refereeReward = 0.0002 ether;  // Welcome reward for new user
    }

    /**
     * @notice Fund the referral reward pool
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
     * @notice Register with a referral code (referrer address)
     * @param referrer The address of the user who referred you
     */
    function registerWithReferral(address referrer) external nonReentrant {
        require(!isRegistered[msg.sender], "CeloPulse: Already registered");
        require(referrer != msg.sender, "CeloPulse: Cannot refer yourself");
        require(referrer != address(0), "CeloPulse: Invalid referrer");

        isRegistered[msg.sender] = true;
        totalRegistered++;

        referrals[msg.sender] = ReferralInfo({
            referrer: referrer,
            referralCount: 0,
            totalEarned: 0,
            joinedAt: block.timestamp,
            hasReferred: false
        });

        // Track referrer's referrals
        if (isRegistered[referrer]) {
            referrals[referrer].referralCount++;
            referredUsers[referrer].push(msg.sender);
            totalReferrals++;

            // Pay rewards if pool has funds
            if (rewardPool >= referrerReward + refereeReward) {
                rewardPool -= referrerReward + refereeReward;

                referrals[referrer].totalEarned += referrerReward;
                (bool s1, ) = payable(referrer).call{value: referrerReward}("");
                require(s1, "CeloPulse: Referrer reward failed");
                emit ReferralRewardPaid(referrer, msg.sender, referrerReward, block.timestamp);

                referrals[msg.sender].totalEarned += refereeReward;
                (bool s2, ) = payable(msg.sender).call{value: refereeReward}("");
                require(s2, "CeloPulse: Referee reward failed");
            }
        }

        emit UserRegistered(msg.sender, referrer, block.timestamp);
    }

    /**
     * @notice Register without a referral
     */
    function register() external {
        require(!isRegistered[msg.sender], "CeloPulse: Already registered");

        isRegistered[msg.sender] = true;
        totalRegistered++;

        referrals[msg.sender] = ReferralInfo({
            referrer: address(0),
            referralCount: 0,
            totalEarned: 0,
            joinedAt: block.timestamp,
            hasReferred: false
        });

        emit UserRegistered(msg.sender, address(0), block.timestamp);
    }

    // ─── View Functions ───

    function getUserReferralInfo(address user) external view returns (
        address referrer,
        uint256 referralCount,
        uint256 totalEarned,
        uint256 joinedAt,
        bool registered
    ) {
        ReferralInfo storage info = referrals[user];
        return (info.referrer, info.referralCount, info.totalEarned, info.joinedAt, isRegistered[user]);
    }

    function getReferredUsers(address user) external view returns (address[] memory) {
        return referredUsers[user];
    }

    function getReferralLink(address user) external pure returns (string memory) {
        // Returns the user address as the referral "code"
        return string(abi.encodePacked("ref=", toAsciiString(user)));
    }

    // ─── Admin ───

    function setRewards(uint256 _referrerReward, uint256 _refereeReward) external onlyOwner {
        referrerReward = _referrerReward;
        refereeReward = _refereeReward;
    }

    // ─── Helper ───

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(42);
        s[0] = "0";
        s[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2 ** (8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 + 2 * i] = char(hi);
            s[3 + 2 * i] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
