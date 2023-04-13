import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon,BinanceTestnet } from "@thirdweb-dev/chains";
export default function App({ Component, pageProps }: AppProps) {
  return(
  <ThirdwebProvider activeChain="binance-testnet" supportedChains={[BinanceTestnet]}>
    <Component {...pageProps} />
  </ThirdwebProvider>)
}
