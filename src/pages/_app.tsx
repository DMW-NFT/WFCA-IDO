import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../../react-i18next-config";
import {
  Ethereum,
  Polygon,
  BinanceTestnet,
  Binance,
  Goerli
} from "@thirdweb-dev/chains";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="ethereum" supportedChains={[Ethereum]}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
