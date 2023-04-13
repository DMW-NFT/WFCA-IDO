import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ConnectWallet,
  useConnectionStatus,
  useWallet,
  useClaimToken,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { ethers } from "ethers";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const connectionStatus = useConnectionStatus();
  const wallet = useWallet();
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
  const [inviteeSignStatus, setInviteeSignStatus] =
    useState<string>("waitForSign");
  const [inviter, setInviter] = useState(null);
  const { contract } = useContract(
    "0x2f86925b0c14662aeCab37AF509A27Fa34fa59DC"
  );
  const [claimAmount, setClaimAmount] = useState(0);

  const { mutateAsync: claimToken, isLoading, error } = useClaimToken(contract);

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

  const getAddressInviter = () => {
    fetch(
      `http://idoapi.wfca.io/api/getRelationship?wallet=${currentWalletAddress}`
    )
      .then((res) => res.json())
      .then((res) => {
        setInviter(res.data.inviter);
        console.log(res.data.inviter);
      });
  };

  const getConfirmedSignature = () => {
    if (!(inviter && ethers.utils.isAddress(inviter))) {
      alert("Please enter a valid address");
      return;
    }

    setInviteeSignStatus("Signing...");
    const message = `{"inviter":"${inviter}","invitee":"${currentWalletAddress}"}`;

    wallet
      ?.signMessage(message)
      .then((res) => {
        console.log(message, res);
        res && sendInvite({ message: message, signature: res });
        setInviteeSignStatus("waitForSign");
      })
      .catch((err) => {
        console.log(err);
        setInviteeSignStatus("waitForSign");
      });
  };

  const sendInvite = (signedMessage: {
    message: any;
    signature?: string | undefined;
  }) => {
    fetch(
      `http://idoapi.wfca.io/api/bindRelationship?message=${signedMessage.message}&&signature=${signedMessage.signature}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    wallet?.getAddress().then((res) => {
      console.log(connectionStatus);
      setCurrentWalletAddress(res);
    });
  }, [connectionStatus]);

  useEffect(() => {
    setInviter("");
    if (currentWalletAddress) {
      getAddressInviter();
    }
  }, [currentWalletAddress]);

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 w-full bg-pink-200 flex justify-between px-4">
        <div></div>
        <ConnectWallet theme="light" />
      </div>

      <div className="w-full grow bg-blue-100 flex justify-center pt-20">
        {!inviter ? (
          <div className="w-[400px] h-[500px] bg-green-100 px-6 pt-4 flex flex-col">
            <div>Inviter Address:</div>
            <div className="w-full flex">
              <input
                className="h-[40px] grow border-[3px] rounded-xl "
                onChange={(e) => {
                  setInviter(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <button
              className="w-auto h-[40px]  mt-10 bg-blue-100 rounded-lg"
              onClick={() => {
                inviteeSignStatus == "waitForSign" && getConfirmedSignature();
              }}>
              {inviteeSignStatus == "waitForSign"
                ? "Confirmed"
                : inviteeSignStatus}
            </button>
            <div>{currentWalletAddress}</div>
          </div>
        ) : (
          <div className="w-[400px] h-[500px] bg-green-100 px-6 pt-4 flex flex-col">
            <div>邀请人：{inviter}</div>
            <div className="w-full flex">
              <input
                className="h-[40px] grow border-[3px] rounded-xl "
                onChange={(e) => {
                  setClaimAmount(Number(e.target.value));
                  console.log(e.target.value);
                }}
              />
            </div>
            <Web3Button
              contractAddress={"0x2f86925b0c14662aeCab37AF509A27Fa34fa59DC"}
              action={() =>
                claimToken({
                  to: currentWalletAddress, // Use useAddress hook to get current wallet address
                  amount: claimAmount, // Amount of token to claim
                  checkERC20Allowance: true,
                })
              }>
              Claim Token
            </Web3Button>
          </div>
        )}
      </div>
    </div>
  );
}
