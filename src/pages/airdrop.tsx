import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import AirDrop from "../../public/image/airdop.jpeg";
const airdrop = () => {
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");
  const connectWallet = async () => {
    // @ts-ignore
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setCurrentWalletAddress(accounts[0]);
  };

  useEffect(() => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then((res) => {
      console.log(res);
    });
  }, []);

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
        setCurrentChainId(chainId);
        console.log(chainId);
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum != undefined) {
      if (currentChainId != "0x66eed" || "") {
        // @ts-ignore
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x66eed" }], // chainId must be in hexadecimal numbers
        });
      }
    }
  }, [currentChainId]);

  return (
    <div className="w-full min-h-screen bg-[#1e052c]  flex justify-center">
      <Image
        src={AirDrop}
        alt="AirDrop"
        className="w-full absolute object-cover z-0"
      />
      <div className="h-auto my-20 mx-10 z-10 text-white lg:w-1/2 lg:pt-10 bg-opacity-10  backdrop-blur-sm bg-white rounded-2xl lg:p-10 p-5">
        <div className="w-full h-[60px] ">
          <p className="text-center text-4xl">WFCA 空投活动</p>
        </div>
        <div className="w-full flex flex-col mb-5">
          <div className="place-self-center mb-5">
            阶段一：完成任务，绑定领取空投地址
          </div>
          <button className="ds-btn ds-btn-secondary bg-opacity-50 place-self-center">
            开始任务
          </button>
        </div>
        <div className="w-full flex flex-col mb-8">
          <div className="place-self-center mb-4">
            阶段二：领取Swap USDT，参与Arbitrum 测试链的WFCA模拟交易大赛
          </div>
          <button className="w-[200px] ds-btn ds-btn-secondary bg-opacity-50 place-self-center mb-5">
            领取 Swap USDT
          </button>
          <button className="w-[200px] ds-btn ds-btn-secondary bg-opacity-50 place-self-center">
            开始模拟交易
          </button>
        </div>
      </div>
    </div>
  );
};

export default airdrop;
