// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/interfaces/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract WFCAClaim is Initializable, OwnableUpgradeable,ERC1155Holder,UUPSUpgradeable {
    using SafeMath for uint256;
    struct PoolInfo {
        uint256 supply;
        uint256 price;
        uint256 balance;
        uint256 minimum;
        uint256 startBlock;
        uint256 endBlock;
    }

    struct UserInfo{
        uint256 allReward; //基础总奖励
        uint256 rebtReward;//实际获取的奖励   补偿奖励=allReward*rewardRatio-rebtReward
        uint256 score;     //推广人数
        uint256 claimed;   //自己认购数量
        address inviterBy; //邀请人
    }

    PoolInfo[] public poolInfo;
    mapping(address user => UserInfo) public userInfo;
    IERC20 tokenWFCA;
    IERC20 tokenMND;
    IERC20 tokenUSDT;
    // IERC1155 toekn1155Diamond;
    ISwapRouterV2 swapRouterV2;
    TokenERC1155 toekn1155Diamond;

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
        tokenWFCA = IERC20(0x209c684BfA5fcCa338EE623eF0Fc675e3122cd2b);
        tokenMND = IERC20(0x9d97e1b22a4a8C8075Fc3b4dAED6700a59F9C869);
        tokenUSDT = IERC20(0x55d398326f99059fF775485246999027B3197955);
        toekn1155Diamond = TokenERC1155(0x737C0295ffA973a9f9Da1d2142321172b729FE40);
        swapRouterV2 = ISwapRouterV2(
            0x10ED43C718714eb63d5aA57B78B54704E256024E
        );
        MNDHolder = 0x236beE2c1F312cc5A99d98684EcE4c634903e2E8;
        USDTHolder = 0x09D240281C73A01b26D8C9295650a3F9B837155F;

        UserInfo storage _userInfo=userInfo[0xe403E8011CdB251c12ccF6911F44D160699CCC3c];
        _userInfo.score=49;
        _userInfo.claimed=10;
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
        require(num <= _info.balance,"WFCAClaim: the pool balance is insufficient");
        require(_info.minimum <= num, "WFCAClaim: require than minimum ");
        require(
            _info.startBlock < block.number && _info.endBlock > block.number,
            "WFCAClaim: Pool Closed"
        );
        require(_info.balance > 0, "WFCAClaim: Insufficient funds");
        UserInfo storage _userInfo=userInfo[msg.sender];
        address _inviter=_userInfo.inviterBy;
        UserInfo storage inviterInfo=userInfo[_inviter];

        if (_inviter == address(0)) {
            inviterInfo=userInfo[inviter];
            require(inviterInfo.claimed>9,"WFCAClaim: err Inviter");
            _userInfo.inviterBy = inviter;
            _inviter = inviter;
            inviterInfo.score+=1;
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
        uint256 mndAmount = amounts[1];
        uint256 _rewardRatio=rewardRatio(_inviter);
        uint256 inviterReward = mndAmount.mul(_rewardRatio).div(100);
        tokenMND.transfer(_inviter, inviterReward);
        tokenMND.transfer(MNDHolder, mndAmount.div(2));
        tokenWFCA.transfer(msg.sender, num * 1e18);
        _info.balance -= num;
        _userInfo.claimed+=num;
        inviterInfo.allReward+=mndAmount;
        inviterInfo.rebtReward+=inviterReward;
        
        uint256 subAmount=inviterInfo.allReward.mul(_rewardRatio).div(100).sub(inviterInfo.rebtReward);
        if(subAmount>0){
            tokenMND.transfer(_inviter,subAmount);
            inviterInfo.rebtReward+=subAmount;
        }

        emit Claimed(poolId, msg.sender, num, _inviter);
    }

    function rewardERC1155(address user) internal {
        uint256 _score = userInfo[user].score;
        //TODO 这里要注意11155的tokenID,请自行设置，或者定义常量
        if (_score == 10) {
            toekn1155Diamond.mintTo(user, 0, "ipfs://QmQV86c4wL9QbXF9ahUbq9EDGqZzFug5m5dhKsDJhYNV9f/0",1);
        } else if (_score == 20) {
            toekn1155Diamond.mintTo(user, 1, "ipfs://QmcQpXStc8YAWXE3C5tyALdKSsvxX5LNppvFHbpjG8et4k/0",1);
        } else if (_score == 30) {
            toekn1155Diamond.mintTo(user, 2, "ipfs://QmSxaLpzFgQHTxY3HdAiJD7RjBCEYkZTmdZfgfsQm4Amso/0",1);
        } else if (_score == 40) {
            toekn1155Diamond.mintTo(user, 3, "ipfs://QmXCgiB8GYuzqQ1HxFaXqhuytnzNJ1kaWDpxxsjyCkGCzC/0",1);
        } else if (_score == 50) {
            toekn1155Diamond.mintTo(user, 4, "ipfs://QmNd13ghMDdV7xNKbdAH7dhhgad4TnHSQ8yxDiFu1a68ft/0",1);
        }
    }


    function withdrawBalance() external {
        require(msg.sender==MNDHolder);
        tokenMND.transfer(msg.sender, tokenMND.balanceOf(address(this)));
    }

    function rewardRatio(address user) internal view returns (uint256) {
        uint256 _score = userInfo[user].score;
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
interface TokenERC1155 {
    function mintTo(
        address _to,
        uint256 _tokenId,
        string calldata _uri,
        uint256 _amount
    ) external;
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
