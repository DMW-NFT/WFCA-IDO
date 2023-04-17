// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/interfaces/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WFCAClaim is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    using SafeMath for uint256;
    struct PoolInfo {
        uint256 supply;
        uint256 price;
        uint256 balance;
        uint256 minimum;
        uint256 startBlock;
        uint256 endBlock;
    }

    PoolInfo[] public poolInfo;
    mapping(address user => uint256 score) public score;
    mapping(address user => address inviter) public invitedBy;
    IERC20 tokenWFCA;
    IERC20 tokenMND;
    IERC20 tokenUSDT;
    IERC1155 toekn1155Diamond;
    ISwapRouterV2 swapRouterV2;

    address public MNDHolder;
    address public USDTHolder;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        initialize();
        _disableInitializers();
    }

    event Claimed(
        uint256 indexed poolId,
        address indexed claimer,
        uint256 num,
        address inviter
    );

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();

        //TODO 这里需要初始化 token地址和相关持币地址
        tokenWFCA = IERC20(0x3a6A2F396fa52d2e2F127c26F8df738AF151B300);
        tokenMND = IERC20(0x713f11D6c2aA207305336F0bA5Dc63E4D7Ccb74B);
        tokenUSDT = IERC20(0xCA6f0B31ff472DF2eE409D1f0940d59e1630ED3A);
        toekn1155Diamond = IERC1155(0xB92dA5C274C0953aF6a05064169274CD7Ae90539);
        swapRouterV2 = ISwapRouterV2(
            0xDE2Db97D54a3c3B008a097B2260633E6cA7DB1AF
        );
        MNDHolder = 0xe403E8011CdB251c12ccF6911F44D160699CCC3c;
        USDTHolder = 0xe403E8011CdB251c12ccF6911F44D160699CCC3c;
        score[0xe403E8011CdB251c12ccF6911F44D160699CCC3c] = 50;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    //合约部署之后，需要初始化3个营销池
    function add(PoolInfo memory _newInfo) external onlyOwner {
        poolInfo.push(_newInfo);
    }

    function getBlockNumbers() public view returns (uint, uint) {
        uint currentBlockNumber = block.number;
        uint sevenDaysLaterBlockNumber = block.number + 28800;
        return (currentBlockNumber, sevenDaysLaterBlockNumber);
    }

    //关于更新营销池，可以根据需要调整或者只能修改开始区块和结束区块
    function updatePool(
        uint256 poolId,
        PoolInfo memory _newInfo
    ) external onlyOwner {
        poolInfo[poolId] = _newInfo;
    }

    function claim(uint256 poolId, uint256 num, address inviter) external {
        PoolInfo storage _info = poolInfo[poolId];
        require(_info.minimum <= num, "WFCAClaim: require than minimum ");
        require(
            _info.startBlock < block.number && _info.endBlock > block.number,
            "WFCAClaim: Pool Closed"
        );
        require(_info.balance > 0, "WFCAClaim: Insufficient funds");

        address _inviter = invitedBy[msg.sender];
        if (_inviter == address(0)) {
            invitedBy[msg.sender] = inviter;
            _inviter = inviter;
            score[inviter] += 1;
            rewardERC1155(_inviter);
        }

        uint256 amount = num.mul(_info.price);
        tokenUSDT.transferFrom(msg.sender, address(this), amount);

        uint256 halfAmount = amount.div(2);
        tokenUSDT.transfer(USDTHolder, halfAmount);

        uint256[] memory amounts = swapTokenATokenB(
            address(tokenUSDT),
            address(tokenMND),
            halfAmount,
            0,
            address(this)
        );
        uint256 mndAMount = amounts[1];

        uint256 inviterReward = mndAMount.mul(rewardRatio(_inviter)).div(100);
        tokenMND.transfer(_inviter, inviterReward);
        tokenMND.transfer(MNDHolder, mndAMount.sub(inviterReward));

        tokenWFCA.transfer(msg.sender, num * 1e18);
        _info.balance -= num;
        emit Claimed(poolId, msg.sender, num, _inviter);
    }

    function rewardERC1155(address user) internal {
        uint256 _score = score[user];
        //TODO 这里要注意11155的tokenID,请自行设置，或者定义常量
        if (_score == 10) {
            toekn1155Diamond.safeTransferFrom(address(this), user, 0, 1, "");
        } else if (_score == 20) {
            toekn1155Diamond.safeTransferFrom(address(this), user, 1, 1, "");
        } else if (_score == 30) {
            toekn1155Diamond.safeTransferFrom(address(this), user, 2, 1, "");
        } else if (_score == 40) {
            toekn1155Diamond.safeTransferFrom(address(this), user, 3, 1, "");
        } else if (_score == 50) {
            toekn1155Diamond.safeTransferFrom(address(this), user, 4, 1, "");
        }
    }

    function rewardRatio(address user) internal view returns (uint256) {
        uint256 _score = score[user];
        if (_score < 10) {
            return 20;
        } else if (_score < 20) {
            return 40;
        }
        return 50;
    }

    function swapTokenATokenB(
        address tokenA,
        address tokenB,
        uint256 aAmount,
        uint256 bAmount,
        address to
    ) internal returns (uint256[] memory) {
        address[] memory path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB;
        IERC20(tokenA).approve(address(swapRouterV2), aAmount);
        return
            swapRouterV2.swapExactTokensForTokens(
                aAmount,
                bAmount,
                path,
                to,
                block.timestamp
            );
    }
}

interface ISwapRouterV2 {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapTokensForExactETH(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapETHForExactTokens(
        uint amountOut,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}
