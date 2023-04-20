import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { InjectedWallet } from "@thirdweb-dev/wallets";
import ERC20ABI from "../ABI/ERC20ABI.json";
const IDO = () => {
  const IDO_ABI = [
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
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155BatchReceived",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
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
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
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
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
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
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "userInfo",
      outputs: [
        {
          internalType: "uint256",
          name: "allReward",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "rebtReward",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "score",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "claimed",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "inviterBy",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [tpSupported, setTpSupported] = useState(false);
  const [errlog, setErrLog] = useState("");
  const [accuntsList, setAccountsList] = useState<string[]>([]);
  const [IDO_CONTRACT, setIDO_CONTRACT] = useState<any>(null);
  const [USDT_CONTRACT, setUSDT_CONTRACT] = useState<any>(null);
  const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
  const getAddress = async () => {
    // @ts-ignore
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAccountsList(accounts);
  };

  const claim = () => {
    IDO_CONTRACT.claim().then((res: any) => {});
  };
  useEffect(() => {
    // @ts-ignore
    if (window.ethereum.isTokenPocket == "undefined") {
      console.log("TokenPocket Extension is installed!");
    } else {
      setTpSupported(true);
      getAddress();
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.ethereum.on("accountsChanged", function (accounts) {
      setAccountsList(accounts);
    });
  }, []);

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

    setIDO_CONTRACT(IDO_CONTRACT);
    setUSDT_CONTRACT(USDT_CONTRACT);
    console.log("init conrtact");
  }, [accuntsList]);

  useEffect(() => {
    if (accuntsList[0] && IDO_CONTRACT) {
      console.log(accuntsList[0]);
      IDO_CONTRACT.userInfo(accuntsList[0]).then((res: any) => {
        console.log(res);
      });
    }
  }, [accuntsList]);

  const approveUSDT = () => {
    try {
      // @ts-ignore
      console.log("ok");

      USDT_CONTRACT.approve(
        "0xc204202c2840Fd33F84a951b9583462230640B83",
        ethers.utils.parseUnits("100")
      ).then((res: any) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>tpSupported:{String(tpSupported)}</p>
      <button
        onClick={() => {
          approveUSDT();
        }}>
        connect
      </button>
      <p>{accuntsList[0]}</p>
    </div>
  );
};
export default IDO;
