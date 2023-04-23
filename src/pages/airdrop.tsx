import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import AirDrop from "../../public/image/airdop.jpeg";
import ERC20ABI from "../ABI/ERC20DROPABI.json";
const airdrop = () => {
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");
  const [USDT_CONTRACT, setUSDT_CONTRACT] = useState<any>(null);
  const [claiming, setClaiming] = useState(false);
  const connectWallet = async () => {
    // @ts-ignore
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setCurrentWalletAddress(accounts[0]);
  };

  const claimSwapUsdt = () => {
    if (window.ethereum == undefined) {
      alert("未在该浏览器检测到钱包插件，请在区块链浏览器打开本网站！");
      return;
    }
    setClaiming(true);
    USDT_CONTRACT.claim(
      currentWalletAddress,
      "100000000000000000000000",
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      0,
      {
        proof: [
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
        quantityLimitPerWallet: "100000000000000000000000",
        pricePerToken: "0",
        currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      },
      "0x"
    )
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          console.log("tx res!", res.status);
          if (res.status === 1) {
            alert("领取成功");
            setClaiming(false);
          } else {
            alert("领取失败");
            setClaiming(false);
          }
        });
      })
      .catch((err: any) => {
        console.log(err);
        alert("领取失败");
        setClaiming(false);
      });
  };

  //   useEffect(() => {
  //     // @ts-ignore
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     provider.getNetwork().then((res) => {
  //       console.log(res);
  //     });
  //   }, []);

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

  useEffect(() => {
    if (currentWalletAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const USDT_CONTRACT = new ethers.Contract(
        "0x8bC76bfCF50801262Bd3A82cc924156AA47858f5",
        ERC20ABI,
        signer
      );
      setUSDT_CONTRACT(USDT_CONTRACT);
    }
  }, [currentWalletAddress]);

  return (
    <div className="w-full min-h-screen bg-[#1e052c]  flex justify-center">
      <Image
        src={AirDrop}
        alt="AirDrop"
        className="w-full absolute object-cover z-0"
      />
      <div className="h-auto my-20 mx-10 z-10 text-white lg:w-1/2 lg:pt-10 bg-opacity-10  backdrop-blur-sm bg-black rounded-2xl lg:p-10 p-5">
        <div className="w-full h-[60px] ">
          <p className="text-center text-4xl">WFCA 空投活动</p>
        </div>
        <div className="w-full flex flex-col mb-5">
          <div className="place-self-center mb-5">
            阶段一：完成任务，绑定领取空投地址
          </div>
          <button
            className="ds-btn ds-btn-secondary bg-opacity-50 place-self-center"
            onClick={() => {
              window.open("https://gleam.io/CpYJQ/wfca-air-drop");
            }}>
            开始任务
          </button>
        </div>
        <div className="w-full flex flex-col mb-8">
          <div className="place-self-center mb-4">
            阶段二：领取Swap USDT，参与Arbitrum 测试链的WFCA模拟交易大赛
          </div>
          {!claiming ? (
            <button
              className="w-[200px] ds-btn ds-btn-secondary bg-opacity-50 place-self-center mb-5"
              onClick={() => {
                claimSwapUsdt();
              }}>
              领取 Swap USDT
            </button>
          ) : (
            <button className="w-[200px] ds-btn ds-btn-secondary bg-opacity-50 place-self-center mb-5">
              领取中
            </button>
          )}

          <button
            className="w-[200px] ds-btn ds-btn-secondary bg-opacity-50 place-self-center"
            onClick={() => {
              window.open(
                "https://app.uniswap.org/#/swap?outputCurrency=0x0381fEadE9cd9844d67750619d6040E825d4B372&inputCurrency=0x8bC76bfCF50801262Bd3A82cc924156AA47858f5"
              );
            }}>
            开始模拟交易
          </button>

          <div className="place-self-center mt-4 ">
            说明：累计Swap次数需大于等于 800
            次，禁止使用脚本或是其他自动化工具，否则取消资格。
          </div>
        </div>
      </div>
    </div>
  );
};

export default airdrop;
