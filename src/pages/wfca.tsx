import Image from "next/image";
import { Inter } from "next/font/google";
import bannar from "../../public/image/bannar2.png";
import purchase from "../../public/image/purchase.png";
import btn from "../../public/image/btn.png";
import border from "../../public/image/border.png";
import ERC20ABI from "../ABI/ERC20ABI.json";
import LOCKABI from "../ABI/LOCKABI.json";
import ERC20DROP from "../ABI/ERC20DROPABI.json";

import {
  ConnectWallet,
  useConnectionStatus,
  useClaimerProofs,
  useActiveClaimConditionForWallet,
  useClaimIneligibilityReasons,
  useWallet,
  useContract,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { ethers } from "ethers";
import Head from "next/head";
export default function Home() {
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");

  const [currenReleaseRetio, setCurrenReleaseRetio] = useState(0);
  const [userReleaseInfo, setUserReleaseInfo] = useState<any>(null);
  // a usestate for sWFCA_CONTRACT
  const [sWFCA_CONTRACT, setsWFCA_CONTRACT] = useState<any>(null);
  const [WFCA_CONTRACT, setWFCA_CONTRACT] = useState<any>(null);
  const [LOCK_CONTRACT, setLOCK_CONTRACT] = useState<any>(null);
  const [currtChainId, setCurrtChainId] = useState("");
  //   a usestate for the claimer info
  const [claimerInfo, setClaimerInfo] = useState<any>(null);
  // usestate of swfca balance
  const [swfcaBlance, setSwfcaBlance] = useState<any>(null);
  const [activeClaimCondition, setActivClaimCondition] = useState<any>(null);
  const [reason, setReason] = useState<any>(null);
  const [onClaimsWFCA, setOnClaimsWFCA] = useState(false);
  const [onClaimRelaseToken, setOnClaimRelaseToken] = useState(false);

  const { contract } = useContract(
    "0xDCC45A40CdeD65b814A50531cEAb4BBbB750f850"
  );
  const connectWallet = async () => {
    // @ts-ignore
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setCurrentWalletAddress(accounts[0]);
  };

  const addToken = async () => {
    const tokenAddress = "0xae4533189C7281501F04bA4b7c37e3ADeD402902";
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
  const {
    data: claimerProofs,
    isLoading,
    error,
  } = useClaimerProofs(contract, currentWalletAddress);

  const {
    data: activeClaimConditions,
    isLoading: conditionIsLoading,
    error: conditionError,
  } = useActiveClaimConditionForWallet(contract, currentWalletAddress);

  const {
    data: reasons,
    isLoading: reasonIsloading,
    error: reasonError,
  } = useClaimIneligibilityReasons(contract, {
    walletAddress: currentWalletAddress, // Use useAddress hook to get the user's wallet address
    quantity: claimerInfo ? claimerInfo.maxClaimable : 0, // Quantity to check eligibility for
  });

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

  const claimSWFCA = () => {
    setOnClaimsWFCA(true);
    const quantity = ethers.utils.parseUnits(claimerInfo.maxClaimable, "ether");
    const currency = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const pricePerToken = ethers.utils.parseUnits("0", "ether");
    const proof = {
      proof: claimerInfo.proof,
      quantityLimitPerWallet: quantity,
      pricePerToken: ethers.constants.MaxUint256,
      currency: "0x0000000000000000000000000000000000000000",
    };
    console.log(
      currentWalletAddress,
      quantity,
      currency,
      pricePerToken,
      proof,
      []
    );
    sWFCA_CONTRACT
      .claim(currentWalletAddress, quantity, currency, pricePerToken, proof, [])
      .then((tx: any) => {
        console.log(tx);
        tx.wait().then((res: any) => {
          console.log("claimWFCA", res);
          if (res.status) {
            setOnClaimsWFCA(false);
            getSWFCABalance();
            getUerReleaseInfo();
            alert("领取成功");
          } else {
            setOnClaimsWFCA(false);
            alert("领取失败");
          }
        });
      })
      .catch((err: any) => {
        setOnClaimsWFCA(false);
        alert("领取失败");
      });
  };

  const claimRelaseToken = () => {
    if (parseInt(userReleaseInfo.currentClaimable)) {
      setOnClaimRelaseToken(true);
      LOCK_CONTRACT.ClaimToken()
        .then((tx: any) => {
          console.log(tx);
          tx.wait().then((res: any) => {
            console.log("claimRelaseToken", res);
            if (res.status) {
              setOnClaimRelaseToken(false);
              getUerReleaseInfo();
              alert("领取成功");
            } else {
              setOnClaimRelaseToken(false);
              alert("领取失败");
            }
            setOnClaimRelaseToken(false);
            getUerReleaseInfo();
          });
        })
        .catch((err: any) => {
          setOnClaimRelaseToken(false);
          alert("领取失败");
        });
    } else {
      alert("当前无可领取的WFCA");
    }
  };

  // get current wallet swfca balance
  const getSWFCABalance = () => {
    if (sWFCA_CONTRACT != null) {
      sWFCA_CONTRACT.balanceOf(currentWalletAddress).then((res: any) => {
        console.log("current wallet swfca balance", res);
        setSwfcaBlance(res);
      });
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
      if (currtChainId != "0x1" || "") {
        // @ts-ignore
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }], // chainId must be in hexadecimal numbers
        });
      }
    }
  }, [currtChainId]);

  useEffect(() => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sWFCA_CONTRACT = new ethers.Contract(
      "0xDCC45A40CdeD65b814A50531cEAb4BBbB750f850",
      ERC20DROP,
      signer
    );
    const WFCA_CONTRACT = new ethers.Contract(
      "0xae4533189C7281501F04bA4b7c37e3ADeD402902",
      ERC20ABI,
      signer
    );
    const LOCK_CONTRACT = new ethers.Contract(
      "0x71Dd2Ce5ad0926391C2a858645D3e926983c87B7",
      LOCKABI,
      signer
    );

    setsWFCA_CONTRACT(sWFCA_CONTRACT);
    setWFCA_CONTRACT(WFCA_CONTRACT);
    setLOCK_CONTRACT(LOCK_CONTRACT);
  }, [currentWalletAddress, currtChainId]);

  useEffect(() => {
    console.log(claimerProofs, isLoading, error);
    if (claimerProofs != null) {
      setClaimerInfo(claimerProofs);
    }
  }, [currentWalletAddress, isLoading]);

  useEffect(() => {
    console.log(activeClaimConditions, conditionIsLoading, conditionError);
    if (activeClaimConditions != null) {
      setActivClaimCondition(activeClaimConditions);
    }
  }, [currentWalletAddress, conditionIsLoading, conditionError]);

  useEffect(() => {
    console.log(reasons, reasonIsloading, reasonError);
    if (reason != null) {
      setReason(reasons);
    }
  }, [currentWalletAddress, reasonIsloading, reasonError]);

  useEffect(() => {
    if (LOCK_CONTRACT && currentWalletAddress) {
      getReleaseRetio();
      getUerReleaseInfo();
    }
  }, [LOCK_CONTRACT, currentWalletAddress]);

  useEffect(() => {
    if (sWFCA_CONTRACT && currentWalletAddress) {
      getSWFCABalance();
    }
  }, [sWFCA_CONTRACT, currentWalletAddress]);

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
              {/* <div className="ds-badge ds-badge-warning text-white"></div> */}
            </div>
            <div className="w-full">
              <div className="ds-badge ds-badge-warning text-white text-[8px]" onClick={addToken}>
                添加WFCA到钱包
              </div>
            </div>
            <div className="w-full grow text-center">
              WFCA 已正式在以太坊区块链上线！欢迎领取正式WFCA。
            </div>
            <div className="w-full grow text-center">
              说明：需先领取锁仓WFCA，然后根据当前释放比例和时间领取正式WFCA。
            </div>

            {currentWalletAddress ? (
              <div className="w-full flex justify-between">
                {claimerInfo &&
                  (!onClaimsWFCA ? (
                    <label
                      className="ds-btn ds-btn-outline ds-btn-secondary"
                      htmlFor="my-modal-6"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgb(219 85 245), rgb(51 126 208) ",
                        color: "white",
                        borderWidth: "3px",
                        borderColor: "white",
                      }}
                      onClick={() => {
                        claimSWFCA();
                      }}>
                      领取锁仓WFCA
                    </label>
                  ) : (
                    <button
                      onClick={() => {}}
                      className="btn ds-btn disabled"
                      style={{
                        alignSelf: "center",
                        color: "white",
                        borderWidth: "3px",
                        borderColor: "white",
                      }}>
                      正在领取中
                    </button>
                  ))}
                {!onClaimRelaseToken ? (
                  <label
                    className="ds-btn ds-btn-outline ds-btn-secondary"
                    htmlFor="my-modal-6"
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
                    领取释放的WFCA
                  </label>
                ) : (
                  <button
                    onClick={() => {}}
                    className="btn ds-btn disabled"
                    style={{
                      alignSelf: "center",
                      color: "white",
                      borderWidth: "3px",
                      borderColor: "white",
                    }}>
                    正在领取中
                  </button>
                )}
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
                  <p className=" text-sm text-white">可认领锁仓WFCA:</p>
                  <p className=" text-2xl text-white overflow-auto">
                    {claimerInfo ? claimerInfo.maxClaimable : "加载中..."}
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <p className=" text-sm text-white">已认领锁仓WFCA:</p>
                  <p className=" text-2xl text-white overflow-auto">
                    {swfcaBlance
                      ? ethers.utils.formatEther(swfcaBlance)
                      : "加载中..."}{" "}
                    锁仓WFCA
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
                      )}{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className="w-full h-auto bg-white bg-opacity-25 backdrop-blur-sm mt-10 rounded-3xl py-5 px-2">
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
        </div> */}
      </div>
      <input type="checkbox" id="my-modal-6" className="ds-modal-toggle " />
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
