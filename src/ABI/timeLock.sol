// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TimeLockClaim is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    using SafeMath for uint256;
    mapping(address => uint256) public claimedAmounts;
    uint256 public currentClaimRatio;
    IERC20 private StakingToken;
    IERC20 private ReleaseToken;
    address private StakingTokenAddress;
    address private ReleaseTokenAddress;
    struct userInfo {
        uint256 claimedAmounts;
        uint256 currentClaimable;
        uint256 totalClaimable;
    }

    constructor(address _stakingTokenAddress, address _releaseTokenAddress) {
        initialize(_stakingTokenAddress, _releaseTokenAddress);
        _disableInitializers();
    }

    function initialize(
        address _stakingTokenAddress,
        address _releaseTokenAddress
    ) public initializer {
        __Ownable_init();
        StakingToken = IERC20(_stakingTokenAddress);
        StakingTokenAddress = _stakingTokenAddress;
        ReleaseToken = IERC20(_releaseTokenAddress);
        ReleaseTokenAddress = _releaseTokenAddress;
        currentClaimRatio = 1;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function _getIdoBalance(address user) internal view returns (uint256) {
        uint256 balance = StakingToken.balanceOf(user);
        return balance;
    }

    function _getClaimableAmount(address user) internal view returns (uint256) {
        uint256 balance = _getIdoBalance(user);
        uint256 totalClaimable = balance.mul(currentClaimRatio).div(100);
        return totalClaimable;
    }

    function _getCurrentClaimableAmount(
        address user
    ) internal view returns (uint256) {
        uint256 totalClaimable = _getClaimableAmount(user);
        uint256 currentClaimable = totalClaimable.sub(claimedAmounts[user]);
        return currentClaimable;
    }

    function getInfo(
        address user
    )
        public
        view
        returns (
            uint256 totalClaimable,
            uint256 currentClaimable,
            uint256 userClaimedAmount
        )
    {
        totalClaimable = _getClaimableAmount(user);
        currentClaimable = _getCurrentClaimableAmount(user);
        userClaimedAmount = claimedAmounts[user];
    }

    function updateCurrentClaimRatio(uint256 _newRatio) external onlyOwner {
        require(_newRatio <= 100, "The ratio cannot be greater than 100");
        require(
            _newRatio > currentClaimRatio,
            "New ratio must be greater than current ratio"
        );
        currentClaimRatio = _newRatio;
    }

    function ClaimToken() external {
        uint256 userClaimedAmount = claimedAmounts[msg.sender];
        uint256 currentClaimable = _getCurrentClaimableAmount(msg.sender);
        require(currentClaimable > 0, "No claimable tokens");
        ReleaseToken.transfer(msg.sender, currentClaimable);
        uint256 updatedClaimedAmount = currentClaimable.add(userClaimedAmount);
        claimedAmounts[msg.sender] = updatedClaimedAmount;
    }
}
