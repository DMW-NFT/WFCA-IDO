import Image from "next/image";
import { Inter } from "next/font/google";
import bannar from "../../public/image/bannar2.png";
import purchase from "../../public/image/purchase.png";
import btn from "../../public/image/btn.png";
import border from "../../public/image/border.png";
import ERC20ABI from "../ABI/ERC20ABI.json";
import IDO_ABI from "../ABI/IDOABI.json";
import LOCKABI from "../ABI/LOCKABI.json";

import {
  ConnectWallet,
  useConnectionStatus,
  useWallet,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { ethers } from "ethers";
import Head from "next/head";
export default function Home() {
  const connectionStatus = useConnectionStatus();
  const wallet = useWallet();
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
  const [inviteeSignStatus, setInviteeSignStatus] =
    useState<string>("waitForSign");
  const [inviter, setInviter] = useState(null);
  const [blindAddress, setBlindAddress] = useState("");
  const [receiptAddress, setReceiptAddress] = useState<string>("");
  const [claimAmount, setClaimAmount] = useState(" ");
  const [canClaim, setCanClaim] = useState(false);
  const [inviteeHistory, setInviteeHistory] = useState<any>([]);
  const [claimHistory, setClaimHistory] = useState<any>([]);
  const [totalSupply, setTotalSupply] = useState("0");
  const [usdtAllowance, setUsdtAllowance] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [wfcaBalance, setwfcaBalance] = useState("0");
  const [toApprove, setToApprove] = useState(false);
  const [poolInfo, setPoolInfo] = useState();

  const [IDO_CONTRACT, setIDO_CONTRACT] = useState<any>(null);
  const [USDT_CONTRACT, setUSDT_CONTRACT] = useState<any>(null);
  const [WFCA_CONTRACT, setWFCA_CONTRACT] = useState<any>(null);
  const [LOCK_CONTRACT, setLOCK_CONTRACT] = useState<any>(null);
  const [currtChainId, setCurrtChainId] = useState("");
  const [chainIdListener, setChainIdListener] = useState<any>(false);
  const [currenReleaseRetio, setCurrenReleaseRetio] = useState(0);
  const [userReleaseInfo, setUserReleaseInfo] = useState<any>(null);
  const connectWallet = async () => {
    // @ts-ignore
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setCurrentWalletAddress(accounts[0]);
  };

  const getUserInfo = async () => {
    console.log("currentwallet :", currentWalletAddress);
    const res = await IDO_CONTRACT.userInfo(currentWalletAddress);
    const score = parseInt(res.score);
    console.log("userInfo:", res);

    setInviter(res.inviterBy);
    setBlindAddress(res.inviterBy);
    let lv = 6;
    if (score >= 10) {
      lv = 5;
    }
    if (score >= 20) {
      lv = 4;
    }
    if (score >= 30) {
      lv = 3;
    }
    if (score >= 40) {
      lv = 2;
    }
    if (score >= 50) {
      lv = 1;
    }

    setInviteeHistory({ quorum: score, level: lv });
  };

  const getCurrentPoolInfo = async () => {
    const res = await IDO_CONTRACT.poolInfo(0);
    console.log("poolInfo", res);
    setPoolInfo(res);
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

    if (Number(claimAmount) < 10) {
      alert("单次兑换最低10 WFCA");
      setClaimAmount(10);
      return;
    }

    if (Number(claimAmount) * 15 > Number(usdtAllowance)) {
      setToApprove(true);
      return;
    }

    if (Number(claimAmount) * 15 > Number(usdtBalance)) {
      alert("USDT余额不足");
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
    const balance = await WFCA_CONTRACT.balanceOf(currentWalletAddress);
    const supply = await WFCA_CONTRACT.totalSupply();
    console.log("erc20 supply:", supply);
    console.log(balance);

    setwfcaBalance(ethers.utils.formatEther(balance._hex));
    setTotalSupply(ethers.utils.formatEther(supply._hex));
  };

  const getUSDTInfo = async () => {
    const balance = await USDT_CONTRACT.balanceOf(currentWalletAddress);
    const allowance = await USDT_CONTRACT.allowance(
      currentWalletAddress,
      "0xc204202c2840Fd33F84a951b9583462230640B83"
    );

    console.log("erc20 balance:", balance);
    console.log("erc20 allowance:", allowance);
    setUsdtBalance(ethers.utils.formatEther(String(parseInt(balance._hex))));
    setUsdtAllowance(
      ethers.utils.formatEther(String(parseInt(allowance._hex)))
    );
    setCanClaim(false);
    setToApprove(false);
  };

  const addToken = async () => {
    const tokenAddress = "0x33168a777aA4A7e597CcBf75C3fd21b985B189F2";
    const tokenSymbol = "WFCA";
    const tokenDecimals = 18;
    const tokenImageUri =
      "https://ipfs.thirdwebcdn.com/ipfs/QmQPcb31Q9rxuTcS2mr1of8J9BVWxRPPC1aBzeXB3oDEb9/WFCA.png";
    try {
      // @ts-ignore
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            tokenImage: tokenImageUri,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const approveUSDT = () => {
    try {
      // @ts-ignore
      USDT_CONTRACT.approve(
        "0xc204202c2840Fd33F84a951b9583462230640B83",
        ethers.utils.parseUnits(String(Number(claimAmount) * 15))
      )
        .then((res: any) => {
          console.log(res);
          setCanClaim(false);
          setToApprove(false);
        })
        .finally(() => {
          getUSDTInfo();
          setCanClaim(false);
          setToApprove(false);
          checkClaimInput();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const claimToken = () => {
    try {
      setCanClaim(false);
      IDO_CONTRACT.claim(0, claimAmount, blindAddress)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          setCanClaim(false);
          getUSDTInfo();
          getWFCABalance();
        });
    } catch (error) {}
  };

  const getReleaseRetio = () => {
    LOCK_CONTRACT.currentClaimRatio().then((res: any) => {
      console.log("release Ratio:", res);
      setCurrenReleaseRetio(parseInt(res._hex));
    });
  };

  const getUerReleaseInfo = () => {
    LOCK_CONTRACT.getInfo(currentWalletAddress).then((res: any) => {
      console.log("current wallet Release Info", res);
      setUserReleaseInfo(res);
    });
  };

  const claimRelaseToken = () => {
    if (parseInt(userReleaseInfo.currentClaimable)) {
      LOCK_CONTRACT.ClaimToken().then((res: any) => {
        console.log(res);
      });
    } else {
      alert("当前无可领取的WFCA");
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (window.ethereum == undefined) {
      alert("未在该浏览器检测到钱包插件，请在区块链浏览器打开本网站！");
    } else {
      connectWallet();
      // @ts-ignore
      window.ethereum.on("accountsChanged", function (accounts) {
        setCurrentWalletAddress(accounts[0]);
      });
      // @ts-ignore
      !chainIdListener &&
        window.ethereum.on("chainChanged", function (chainId) {
          // if (chainId != "0x38") {
          //   alert("请切换至BSC主网");
          // }
          setCurrtChainId(chainId);
          console.log(chainId);
        });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum != undefined) {
      if (currtChainId != "0x38" || "") {
        // @ts-ignore
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // chainId must be in hexadecimal numbers
        });
      }
    }
  }, [currtChainId]);

  useEffect(() => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const IDO_CONTRACT = new ethers.Contract(
      "0xc204202c2840Fd33F84a951b9583462230640B83",
      IDO_ABI,
      signer
    );
    const USDT_CONTRACT = new ethers.Contract(
      "0x55d398326f99059fF775485246999027B3197955",
      ERC20ABI,
      signer
    );
    const WFCA_CONTRACT = new ethers.Contract(
      "0x209c684BfA5fcCa338EE623eF0Fc675e3122cd2b",
      ERC20ABI,
      signer
    );
    const LOCK_CONTRACT = new ethers.Contract(
      "0xd610E983eAf26936dB9Fb0a97Eac4E96A4299f0D",
      LOCKABI,
      signer
    );

    setIDO_CONTRACT(IDO_CONTRACT);
    setUSDT_CONTRACT(USDT_CONTRACT);
    setWFCA_CONTRACT(WFCA_CONTRACT);
    setLOCK_CONTRACT(LOCK_CONTRACT);
  }, [currentWalletAddress, currtChainId]);

  useEffect(() => {
    if (IDO_CONTRACT && currentWalletAddress) {
      getCurrentPoolInfo();
      getUserInfo();
    }
  }, [IDO_CONTRACT, currentWalletAddress]);

  useEffect(() => {
    if (WFCA_CONTRACT && currentWalletAddress) {
      getClaimedAmount();
      getWFCABalance();
    }
  }, [WFCA_CONTRACT, currentWalletAddress]);

  useEffect(() => {
    if (USDT_CONTRACT && currentWalletAddress) {
      getUSDTInfo();
    }
  }, [USDT_CONTRACT, currentWalletAddress]);

  useEffect(() => {
    if (LOCK_CONTRACT && currentWalletAddress) {
      getReleaseRetio();
      getUerReleaseInfo();
    }
  }, [LOCK_CONTRACT, currentWalletAddress]);

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
        <div className="h-full">
          <p>
            已连接:{currentWalletAddress.slice(0, 6)}...
            {currentWalletAddress.slice(-5, -1)}
          </p>
        </div>
      </div>
      <div className="w-full px-[40px] lg:px-[260px] mt-10 z-20 absolute">
        <div className="w-full lg:h-[400px]  text-white z-0  mt-10 flex flex-col lg:flex-row">
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
                {poolInfo && ethers.utils.formatEther(poolInfo.price)} USDT/WFCA
              </div>
            </div>
            <div className="w-full">
              <div
                className="ds-badge ds-badge-warning text-white text-[8px]"
                onClick={addToken}>
                添加WFCA到钱包
              </div>
            </div>
            <div className="w-full grow text-center">
              欢迎来到
              WFCA，这是一个革命性的Web3平台，专注于提供最好的Web3项目！
            </div>

            {currentWalletAddress &&
              !(inviter == "0x0000000000000000000000000000000000000000") && (
                <div className="w-full">
                  <p className=" text-sm text-white">邀请人:</p>
                  <p className=" text-sm text-white max-w-screen overflow-auto">
                    {inviter}
                  </p>
                </div>
              )}

            {currentWalletAddress ? (
              <div className="w-full flex justify-between">
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
                  兑换WFCA
                </label>
                <button
                  className="btn ds-btn"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                    color: "white",
                    borderWidth: "3px",
                    borderColor: "white",
                  }}
                  onClick={() => {
                    claimRelaseToken();
                  }}>
                  领取释放额度
                </button>
              </div>
            ) : (
              <button
                style={{
                  alignSelf: "center",
                  backgroundImage:
                    "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                  color: "white",
                  borderWidth: "3px",
                  borderColor: "white",
                }}
                onClick={() => {
                  connectWallet();
                }}>
                连接钱包
              </button>
            )}
          </div>
          <div className="w-full lg:w-1/2 bg-pink-200 lg:h-full h-[500px] bg-opacity-25 backdrop-blur-sm rounded-b-3xl lg:rounded-l-none lg:rounded-r-xl  flex flex-col  p-4 space-y-2">
            {currentWalletAddress && (
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
                    MND
                  </p>
                </div>
              </div>
            )}
            {currentWalletAddress && (
              <div className="w-full min-h-[60px] flex flex-row divide-x-2">
                <div className="w-1/2">
                  <p className=" text-sm text-white">未释放: </p>
                  <p className=" text-2xl text-white">
                    {userReleaseInfo &&
                      Number(
                        ethers.utils.formatEther(userReleaseInfo.totalClaimable)
                      ) -
                        Number(
                          ethers.utils.formatEther(
                            userReleaseInfo.userClaimedAmount
                          )
                        )}{" "}
                    WFCA
                  </p>
                </div>
                <div className="w-1/2">
                  <p className=" text-sm text-white pl-2">当前释放率:</p>
                  <p className=" text-2xl text-white pl-2">
                    {currenReleaseRetio} %
                  </p>
                </div>
              </div>
            )}
            {currentWalletAddress && (
              <div className="w-full min-h-[60px] flex flex-row divide-x-2">
                <div className="w-1/2">
                  <p className=" text-sm text-white">已领取释放:</p>
                  <p className=" text-2xl text-white">
                    {userReleaseInfo &&
                      ethers.utils.formatEther(
                        userReleaseInfo.userClaimedAmount
                      )}{" "}
                    WFCA
                  </p>
                </div>
                <div className="w-1/2">
                  <p className=" text-sm text-white pl-2">当前可领取释放:</p>
                  <p className=" text-2xl text-white pl-2">
                    {" "}
                    {userReleaseInfo &&
                      ethers.utils.formatEther(
                        userReleaseInfo.currentClaimable
                      )}
                  </p>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col space-y-3">
              <p className=" text-sm text-white">IDO 进度:</p>
              <progress
                className="ds-progress ds-progress-secondary  w-full"
                value={
                  poolInfo &&
                  (
                    1 -
                    (Number(ethers.utils.formatEther(poolInfo.balance._hex)) /
                      Number(ethers.utils.formatEther(poolInfo.supply._hex))) *
                      100
                  ).toFixed(2)
                }
                max="100"></progress>
              <div className="w-full flex flex-row justify-between">
                <p className=" text-sm text-white ">
                  {poolInfo &&
                    (
                      (1 -
                        parseInt(poolInfo.balance._hex, 16) /
                          parseInt(poolInfo.supply._hex, 16)) *
                      100
                    ).toFixed(2)}
                  %
                </p>
                <p className=" text-sm text-white ">
                  {poolInfo &&
                    parseInt(poolInfo.supply._hex, 16) -
                      parseInt(poolInfo.balance._hex, 16)}
                  /{poolInfo && parseInt(poolInfo.supply._hex, 16)} WFCA
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
              1.直推不满10个，推荐奖励百分之十。满十个奖励百分之十五。同时赠送5等级
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
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-6" className="ds-modal-toggle " />
      <div className="ds-modal">
        <div className="ds-modal-box relative bg-opacity-25 backdrop-blur-xl lg:h-[500px] bg-white">
          <label
            htmlFor="my-modal-6"
            className="ds-btn ds-btn-sm ds-btn-circle absolute right-2 top-2 bg-pink-500 border-white">
            ✕
          </label>
          <h3 className="text-lg font-bold">兑换WFCA</h3>
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
                  placeholder=""
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
                placeholder=" "
                value={claimAmount}
                className="ds-input ds-input-bordered ds-input-secondary text-pink-500 w-full max-w-xs"
                onChange={(e) => {
                  setClaimAmount(Number(e.target.value));
                  setCanClaim(false);
                  setToApprove(false);
                  console.log(e.target.value);
                }}
              />
              <label className="ds-label">
                <span className="ds-label-text-alt text-white text-xl">
                  需要支付:{claimAmount * 15} USDT
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
              <button
                onClick={() => {
                  claimToken();
                }}
                className="btn ds-btn"
                style={{
                  alignSelf: "center",
                  backgroundImage:
                    "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                  color: "white",
                  borderWidth: "3px",
                  borderColor: "white",
                }}>
                兑换WFCA
              </button>
            ) : (
              <div>
                {!toApprove && (
                  <button
                    className="ds-btn ds-btn-active ds-btn-ghost"
                    onClick={checkClaimInput}>
                    Chek
                  </button>
                )}
                {toApprove && (
                  <button
                    onClick={() => {
                      approveUSDT();
                    }}
                    className="btn ds-btn"
                    style={{
                      alignSelf: "center",
                      backgroundImage:
                        "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                      color: "white",
                      borderWidth: "3px",
                      borderColor: "white",
                    }}>
                    批准许可额度
                  </button>
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
