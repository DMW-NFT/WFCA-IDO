import Image from "next/image";
import { Inter } from "next/font/google";
import bannar from "../../public/image/bannar2.png";
import purchase from "../../public/image/purchase.png";
import btn from "../../public/image/btn.png";
import border from "../../public/image/border.png";

import {
  ConnectWallet,
  useConnectionStatus,
  useWallet,
  useClaimToken,
  useContract,
  Web3Button,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { ethers } from "ethers";
import Head from "next/head";
export default function Home() {
  const IDO_ABI = [
    {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "supply",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minimum",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "startBlock",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endBlock",
              type: "uint256",
            },
          ],
          internalType: "struct WFCAClaim.PoolInfo",
          name: "_newInfo",
          type: "tuple",
        },
      ],
      name: "add",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "previousAdmin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "AdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "beacon",
          type: "address",
        },
      ],
      name: "BeaconUpgraded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "poolId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "inviter",
          type: "address",
        },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "poolId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "claimer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "inviter",
          type: "address",
        },
      ],
      name: "Claimed",
      type: "event",
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "version",
          type: "uint8",
        },
      ],
      name: "Initialized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "poolId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "supply",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minimum",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "startBlock",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endBlock",
              type: "uint256",
            },
          ],
          internalType: "struct WFCAClaim.PoolInfo",
          name: "_newInfo",
          type: "tuple",
        },
      ],
      name: "updatePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
      ],
      name: "Upgraded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
      ],
      name: "upgradeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "upgradeToAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBlockNumbers",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "invitedBy",
      outputs: [
        {
          internalType: "address",
          name: "inviter",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MNDHolder",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "poolInfo",
      outputs: [
        {
          internalType: "uint256",
          name: "supply",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "minimum",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "startBlock",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endBlock",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "proxiableUUID",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "score",
      outputs: [
        {
          internalType: "uint256",
          name: "score",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "USDTHolder",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const connectionStatus = useConnectionStatus();
  const wallet = useWallet();
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
  const [inviteeSignStatus, setInviteeSignStatus] =
    useState<string>("waitForSign");
  const [inviter, setInviter] = useState(null);
  const [blindAddress, setBlindAddress] = useState("");
  const [receiptAddress, setReceiptAddress] = useState<string>("");

  const [claimAmount, setClaimAmount] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [inviteeHistory, setInviteeHistory] = useState<any>([]);

  const [claimHistory, setClaimHistory] = useState<any>([]);
  const [totalSupply, setTotalSupply] = useState("0");
  const [usdtAllowance, setUsdtAllowance] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [wfcaBalance, setwfcaBalance] = useState("0");
  const [toApprove, setToApprove] = useState(false);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-2-s2.binance.org:8545"
  );
  const IDO_CONTRACT = new ethers.Contract(
    "0x0E149435c644Dd09015Fd91D048E69EFf9D04722",
    IDO_ABI,
    provider
  );
  wallet?.addListener("change", (data) => {
    wallet.disconnect();

    setCurrentWalletAddress(data.address);
  });
  wallet?.addListener("connect", (data) => {
    setCurrentWalletAddress(data.address);
  });
  wallet?.addListener("disconnect", () => {
    setCurrentWalletAddress("");
  });

  const getAddressInviter = async () => {
    const inviter = await IDO_CONTRACT.invitedBy(currentWalletAddress);
    console.log("inviter", inviter);
    setInviter(inviter);
    setBlindAddress(inviter);
  };

  // const getConfirmedSignature = () => {
  //   if (!(blindAddress && ethers.utils.isAddress(blindAddress))) {
  //     alert("请输入合法的钱包地址");
  //     return;
  //   }

  //   setInviteeSignStatus("Signing...");
  //   const message = `{"inviter":"${blindAddress}","invitee":"${currentWalletAddress}"}`;

  //   wallet
  //     ?.signMessage(message)
  //     .then((res) => {
  //       console.log(message, res);
  //       res && sendInvite({ message: message, signature: res });
  //       setInviteeSignStatus("waitForSign");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setInviteeSignStatus("waitForSign");
  //     });
  // };
  const checkClaimInput = () => {
    if (
      !(receiptAddress && ethers.utils.isAddress(receiptAddress)) &&
      !inviter
    ) {
      alert("请输入合法钱包地址");
      return;
    }

    if (claimAmount < 10) {
      alert("单次兑换最低10 WFCA");
      setClaimAmount(10);
      return;
    }

    if (claimAmount * 10 > Number(usdtAllowance)) {
      setToApprove(true);
      return;
    }

    setCanClaim(true);
  };

  const getClaimedAmount = () => {
    fetch(
      `https://idoapi.wfca.io/api/getWalletRecord?wallet=${currentWalletAddress}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ok") {
          setClaimHistory(res.data);
          console.log(res.data);
        }
      });
  };

  const getWFCABalance = async () => {
    const sdk = new ThirdwebSDK("binance-testnet");
    const contract = await sdk.getContract(
      "0x3a6A2F396fa52d2e2F127c26F8df738AF151B300"
    );
    const balance = await contract.erc20.balanceOf(currentWalletAddress);
    const supply = await contract.erc20.totalSupply();
    console.log("erc20 supply:", supply);
    console.log(balance);
    setwfcaBalance(balance.displayValue);
    setTotalSupply(supply.displayValue);
  };

  const getUSDTInfo = async () => {
    const sdk = new ThirdwebSDK("binance-testnet");
    const contract = await sdk.getContract(
      "0xCA6f0B31ff472DF2eE409D1f0940d59e1630ED3A"
    );
    const balance = await contract.erc20.balanceOf(currentWalletAddress);
    const allowance = await contract.erc20.allowanceOf(
      currentWalletAddress,
      "0x0E149435c644Dd09015Fd91D048E69EFf9D04722"
    );

    console.log("erc20 balance:", balance);
    console.log("erc20 allowance:", allowance);
    setUsdtBalance(balance.displayValue);
    setUsdtAllowance(allowance.displayValue);
  };

  const sendInvite = (signedMessage: {
    message: any;
    signature?: string | undefined;
  }) => {
    fetch(
      `https://idoapi.wfca.io/api/bindRelationship?message=${signedMessage.message}&&signature=${signedMessage.signature}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === "ok") {
          getAddressInviter();
          alert("绑定成功");
        } else {
          alert(res.message);
        }
      });
  };
  const getWfcaTotalSupply = async () => {
    const sdk = new ThirdwebSDK("binance-testnet");
    const contract = await sdk.getContract(
      "0x3a6A2F396fa52d2e2F127c26F8df738AF151B300"
    );
    const supply = await contract.erc20.totalSupply();
    setTotalSupply(supply.displayValue);
  };
  const getInviteeHistory = async () => {
    const score = await IDO_CONTRACT.score(currentWalletAddress);
    const lv = 6;
    console.log("score", parseInt(score));
    setInviteeHistory({ quorum: parseInt(score), level: lv });
  };

  useEffect(() => {
    wallet?.getAddress().then((res) => {
      console.log(connectionStatus);
      setCurrentWalletAddress(res);
    });
  }, [connectionStatus]);

  useEffect(() => {
    setInviter("");
    getWfcaTotalSupply();
    if (currentWalletAddress) {
      getAddressInviter();
      getInviteeHistory();
      getClaimedAmount();
      getWFCABalance();
      getUSDTInfo();
    }
  }, [currentWalletAddress]);
  return (
    <div className="min-h-[1600px] h-auto lg:min-h-screen bg-[#0f103c] text-white flex">
      <Head>
        <link
          rel="shortcut icon"
          href="https://www.wfca.io/assets/img/logo.png"
        />
      </Head>
      <Image
        src={bannar}
        alt="Album"
        className=" w-full  object-cover object-top  z-0"
      />
      <div className="w-full bg-black bg-opacity-60 backdrop-blur h-[60px] fixed z-50 flex justify-between lg:px-20">
        <div></div>
        <ConnectWallet
          theme="dark"
          style={{
            height: "80%",
            alignSelf: "center",
            backgroundImage:
              "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
            color: "white",
            borderWidth: "3px",
            borderColor: "white",
          }}
        />
      </div>
      <div className="w-full px-[40px] lg:px-[260px] mt-10 z-20 absolute">
        <div className="w-full lg:h-[350px]  text-white z-0  mt-10 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-white  lg:h-full h-[338px] bg-opacity-25 backdrop-blur-sm rounded-t-3xl lg:rounded-r-none lg:rounded-l-xl  flex flex-col  p-4 space-y-2">
            <div className="w-full  flex flex-col justify-center">
              <p className=" text-xl text-white">WFCA</p>
            </div>
            <div className="w-full">
              <div className="ds-badge ds-badge-accent ds-badge-outline">
                OPEN
              </div>
            </div>
            <div className="w-full">
              <div className="ds-badge ds-badge-warning text-white">
                10 USDT/WFCA
              </div>
            </div>
            <div className="w-full grow text-center">
              欢迎来到
              WFCA，这是一个革命性的Web3平台，专注于提供最好的Web3项目！
            </div>

            {connectionStatus === "connected" &&
              !(inviter == "0x0000000000000000000000000000000000000000") && (
                <div className="w-full">
                  <p className=" text-sm text-white">邀请人:</p>
                  <p className=" text-sm text-white max-w-screen overflow-auto">
                    {inviter}
                  </p>
                </div>
              )}

            {connectionStatus === "connected" ? (
              <div className="w-full">
                <label
                  className="ds-btn ds-btn-outline ds-btn-secondary"
                  htmlFor="my-modal-6"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                    color: "white",
                    borderWidth: "3px",
                    borderColor: "white",
                  }}>
                  Claim Token
                </label>
              </div>
            ) : (
              <ConnectWallet
                theme="dark"
                style={{
                  alignSelf: "center",
                  backgroundImage:
                    "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                  color: "white",
                  borderWidth: "3px",
                  borderColor: "white",
                }}
              />
            )}
          </div>
          <div className="w-full lg:w-1/2 bg-pink-200 lg:h-full h-[500px] bg-opacity-25 backdrop-blur-sm rounded-b-3xl lg:rounded-l-none lg:rounded-r-xl  flex flex-col  p-4 space-y-2">
            {connectionStatus == "connected" && (
              <div className="w-full min-h-[117px] flex flex-row divide-x-2">
                <div className="w-1/2">
                  <p className=" text-sm text-white">您的余额:</p>
                  <p className=" text-2xl text-white overflow-auto">
                    {Number(usdtBalance).toFixed(2)} USDT
                  </p>
                  <p className=" text-2xl text-white  overflow-auto">
                    {Number(wfcaBalance).toFixed(2)} WFCA
                  </p>
                  <p className=" text-sm text-white">您的许可额度:</p>
                  <p className=" text-2xl text-white  overflow-auto">
                    {Number(usdtAllowance).toFixed(2)} USDT
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <p className=" text-sm text-white">您的等级:</p>
                  <p className=" text-2xl text-white">
                    Lv {inviteeHistory ? inviteeHistory.level : 6}
                  </p>
                  <p className=" text-sm text-white">有效邀请人数:</p>
                  <p className=" text-2xl text-white">
                    {inviteeHistory ? inviteeHistory.quorum : 0}
                  </p>
                  <p className=" text-sm text-white">奖励池:</p>
                  <p className=" text-2xl text-white">
                    {inviteeHistory
                      ? inviteeHistory.sumQuantityClaimed &&
                        ethers.utils.formatEther(
                          inviteeHistory.sumQuantityClaimed
                        )
                      : 0}{" "}
                    WFCA
                  </p>
                </div>
              </div>
            )}
            {connectionStatus == "connected" && (
              <div className="w-full min-h-[60px] flex flex-row divide-x-2">
                <div className="w-1/2">
                  <p className=" text-sm text-white">已兑换:</p>
                  <p className=" text-2xl text-white">
                    {claimHistory
                      ? claimHistory.sumQuantityClaimed &&
                        claimHistory.sumQuantityClaimed
                      : 0}{" "}
                    WFCA
                  </p>
                </div>
                <div className="w-1/2">
                  <p className=" text-sm text-white pl-2">可兑换:</p>
                  <p className=" text-2xl text-white pl-2"> -- WFCA</p>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col space-y-3">
              <p className=" text-sm text-white">IDO 进度:</p>
              <progress
                className="ds-progress ds-progress-secondary  w-full"
                value="10"
                max="100"></progress>
              <div className="w-full flex flex-row justify-between">
                <p className=" text-sm text-white ">0.001%</p>
                <p className=" text-sm text-white ">
                  {Number(totalSupply).toFixed(2)}/100000000 WFCA
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto bg-white bg-opacity-25 backdrop-blur-sm mt-10 rounded-3xl py-5 px-2">
          <div className="w-full">
            <p className="text-xl text-center">IDO 奖励方案</p>
          </div>
          <div className="w-full lg:px-10">
            <p>
              1.直推不满10个，推荐奖励百分之十，满十个奖励百分之十五。同时赠送5等级
              NFT
            </p>
            <p>2.直推满20个，推荐奖励百分之二十，同时赠送4等级 NFT。</p>
            <p>3.直推满30个，推荐奖励百分之二十五，同时赠送3等级 NFT。</p>
            <p>4.直推满40个，推荐奖励百分之二十五，同时赠送2等级 NFT。</p>
            <p>5.直推满50个，推荐奖励百分之二十五。同时赠送1等级 NFT 。</p>
            <p>备注：</p>
            <p>5等级NFT可兑换原 价值五千人民币。</p>
            <p>4等级NFT可兑换原 价值一万人民币。</p>
            <p>3等级NFT可兑换原 价值两万人民币。</p>
            <p>2等级NFT可兑换原 价值四万人民币</p>
            <p>1等级NFT可兑换原 价值六万人民币。</p>
            <p>钻石由日本企业钻石矿提供。</p>
            <p>代币和NFT奖励将在该轮IDO结束后三个工作日内空投至钱包中</p>
          </div>
        </div>

        {/* <div
            className="mt-[80px] w-[458px] h-[58px] text-[#333] leading-[58px] text-center mx-[auto] mb-[40px]"
            style={style.bannar2}>
            <span className="text-[40px] font-[700]">购买</span>
            <span className="text-[24px]">（XXXX USDT/WFCA）</span>
            </div>

            <div className="w-[458px] h-[60px] flex items-center mx-[auto] text-[16px]">
            <span className="w-[100px]">邀请人地址：</span>
            <input
                placeholder="请输入"
                style={{ outline: "none" }}
                className="ring-[#f4f4f4] rounded-[4px] px-[10px] text-[#333] w-[309px] ml-[4px] h-[40px] leading-[40px] border boroer-[#f4f4f4]"
                type="text"
            />
            </div>

            <div className="w-[458px] h-[60px] flex items-center mx-[auto] text-[16px] mb-[40px]">
            <span className="w-[100px] text-right">购买数量：</span>
            <input
                placeholder="请输入"
                style={{ outline: "none" }}
                className="ring-[#f4f4f4] rounded-[4px] px-[10px] text-[#333] w-[309px] ml-[4px] h-[40px] leading-[40px] border boroer-[#f4f4f4]"
                type="text"
            />
            </div>

            <div
            className="w-[202px] h-[48px] mx-[auto] text-center leading-[48px] mb-[140px]"
            style={style.bannar3}>
            购买
            </div>

            <div
            className="w-[1200px] h-[370px] mx-[auto] p-[40px] text-white mb-[40px]"
            style={style.bannar4}>
            <div className="text-[24px] leading-[24px] font-[700] text-center">
                我的团队
            </div>
            <div className="px-[120px] flex justify-between">
                <span>哈希地址</span>
                <span>数量</span>
            </div>
            <div className="text-white ">
                {arr.map((item, index) => (
                <div
                    className="flex justify-between px-[120px] h-[64px] leading-[64px] border-b"
                    style={{ borderBottom: "1px solod ##f4f4f4" }}>
                    <div>GGGGGGGHHHQQQQQQQIIIQQQQWSFGHJERTYUIOJNGQW</div>
                    <div>x10</div>
                </div>
                ))}
            </div>
            </div>

            <div
            className="w-[202px] h-[48px] mx-[auto] text-center leading-[48px] mb-[140px]"
            style={style.bannar3}>
            领取奖励
            </div>

            <div
            className="w-[1200px] h-[370px] mx-[auto] p-[40px] text-white mb-[40px]"
            style={style.bannar4}>
            <div className="text-[24px] leading-[24px] font-[700] text-center">
                邀请规则
            </div>
            <div className="w-[600px] mx-[auto] text-[14px] leading-[24px] mt-[24px]">
                1.直推不满10个，推荐奖励百分之十，满十个奖励百分之十五。同时赠送5等级
                NFT
                <br />
                2.直推满20个，推荐奖励百分之二十，同时赠送4等级 NFT
                <br />
                3.直推满30个，推荐奖励百分之二十五，同时赠送3等级 NFT
                <br />
                4.直推满40个，推荐奖励百分之二十五，同时赠送2等级 NFT
                <br />
                5.直推满50个，推荐奖励百分之二十五。同时赠送1等级 NFT
                <br />
                备注：5等级 NFT可兑换原 价值五千人民币
                <br />
                4等级 NFT可兑换原 价值一万人民币
                <br />
                3等级 NFT可兑换原 价值两万人民币
                <br />
                2等级 NFT可兑换原 价值四万人民币。
                <br />
                1等级 NFT可兑换原 价值六万人民币。
                <br />
                钻石由日本企业砖石矿提供。
            </div>
            </div> */}
      </div>
      <input type="checkbox" id="my-modal-6" className="ds-modal-toggle " />
      <div className="ds-modal">
        <div className="ds-modal-box relative bg-opacity-25 backdrop-blur-xl lg:h-[500px] bg-white">
          <label
            htmlFor="my-modal-6"
            className="ds-btn ds-btn-sm ds-btn-circle absolute right-2 top-2 bg-pink-500 border-white">
            ✕
          </label>
          <h3 className="text-lg font-bold">Claim Token</h3>
          <div className="w-full flex flex-col">
            {inviter == "0x0000000000000000000000000000000000000000" && (
              <div className="ds-form-control w-full max-w-xs">
                <label className="ds-label">
                  <span className="ds-label-text text-white text-xl">
                    邀请人地址:
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="0x123..."
                  className="ds-input ds-input-bordered ds-input-secondary text-pink-500 w-full max-w-xs"
                  onChange={(e) => {
                    setBlindAddress(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="ds-form-control w-full max-w-xs">
              <label className="ds-label">
                <span className="ds-label-text text-white text-xl">
                  兑换WFCA数量:
                </span>
              </label>
              <input
                type="number"
                placeholder="10"
                value={claimAmount}
                className="ds-input ds-input-bordered ds-input-secondary text-pink-500 w-full max-w-xs"
                onChange={(e) => {
                  setClaimAmount(Number(e.target.value));
                  console.log(e.target.value);
                }}
              />
              <label className="ds-label">
                <span className="ds-label-text-alt text-white text-xl">
                  需要支付:{claimAmount * 10} USDT
                </span>
                {/* <span className="ds-label-text-alt">Bottom Right label</span> */}
              </label>
            </div>
          </div>
          <p className="py-4">
            如果提示需要授权许可额度，请选择授权许可额度，然后再进行兑换。
          </p>
          <div className="w-full flex justify-center">
            {canClaim ? (
              <Web3Button
                contractAddress="0x0E149435c644Dd09015Fd91D048E69EFf9D04722"
                contractAbi={IDO_ABI}
                action={(contract) => {
                  setCanClaim(false);
                  contract
                    .call("claim", [0, claimAmount, blindAddress])
                    .then((res) => {
                      console.log(res);
                      setCanClaim(false);
                    })
                    .catch((err) => {
                      console.log(err);
                      setCanClaim(false);
                    });
                }}
                style={{
                  alignSelf: "center",
                  backgroundImage:
                    "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                  color: "white",
                  borderWidth: "3px",
                  borderColor: "white",
                }}>
                Claim Token
              </Web3Button>
            ) : (
              <div>
                <button
                  className="ds-btn ds-btn-active ds-btn-ghost"
                  onClick={checkClaimInput}>
                  Chek
                </button>
                {toApprove && (
                  <Web3Button
                    contractAddress="0xCA6f0B31ff472DF2eE409D1f0940d59e1630ED3A"
                    action={(contract) => {
                      // Logic to execute when clicked
                      contract.erc20
                        .setAllowance(
                          "0x0E149435c644Dd09015Fd91D048E69EFf9D04722",
                          claimAmount * 10
                        )
                        .then((res) => checkClaimInput());
                    }}
                    style={{
                      alignSelf: "center",
                      backgroundImage:
                        "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                      color: "white",
                      borderWidth: "3px",
                      borderColor: "white",
                    }}>
                    批准许可额度
                  </Web3Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  bannar: {
    backgroundImage: `url(${bannar.src})`,
    backgroundSize: "100%,100%",
  },

  bannar2: {
    backgroundImage: `url(${purchase.src})`,
    backgroundSize: "100%,100%",
  },
  bannar3: {
    backgroundImage: `url(${btn.src})`,
    backgroundSize: "100%,100%",
  },
  bannar4: {
    backgroundImage: `url(${border.src})`,
    backgroundSize: "100%,100%",
  },
};
