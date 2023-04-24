import Image from "next/image";
import { Inter } from "next/font/google";
import bannar from "../../public/image/bgheroreal.png";
import Group45 from "../../public/image/Group45.png";
import Group46 from "../../public/image/Group46.png";
import Mask3 from "../../public/image/mark_three.jpg";
import Mask2 from "../../public/image/mark_two.jpg";
import Mask1 from "../../public/image/mark_one.jpg";
import decentralized from "../../public/image/img-decentralized-finance 1.png";
import dmw from "../../public/image/Dmw2.png";
import jindu from "../../public/image/jindu.png";
import bgfooter from "../../public/image/bgfooter.png";
import iconbook from "../../public/image/iconbook.png";
import iconroom from "../../public/image/iconroom.png";
import icontips from "../../public/image/icontips.png";
import metaverse from "../../public/image/img-metaverse 1.png";
import bigbannar from "../../public/image/bigbannar.png";
import { useTranslation } from "react-i18next";
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl, // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton, // 倍速播放选项
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css"; // import css
import { useRouter } from "next/navigation";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const { t, i18n } = useTranslation();
  const player = useRef();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (currentPlayer) {
    }
  }, [currentPlayer]);

  const router = useRouter();
  const gotopdf = (url: string) => {
    window.open(url);
  };
  return (
    <div className=" w-full h-auto bg-[#0f103c] lg:pb-[0]">
      <Head>
        <link
          rel="shortcut icon"
          href="https://www.wfca.io/assets/img/logo.png"
        />
      </Head>
      {/* header */}
      <div className="lg:flex w-full pl-[20px] pr-[20px] h-[104px] bg-blue-800 bg-opacity-50 backdrop-blur-lg justify-between lg:pl-[80px] lg:pr-[80px] items-center  flex flex-row fixed z-50">
        <div className="w-[60px] h-[60px] flex align items-center ">
          <img
            className="rounded-full w-[60px] h-[60px] mr-[24px]"
            src="https://www.wfca.io/assets/img/logo.png"
            alt=""
          />
          <span className="text-white text-[32px]">WFCA</span>
        </div>
        <div className="flex justify-between text-[#333] items-center">
          {/* <div
            className="hover:cursor-pointer font-[700] h-[40px] px-[40px] lg:h-[60px] lg:px-[64px] lg:leading-[64px] leading-[40px] border rounded-[8px] bg-[#f4f4f4]"
            onClick={() => {
              router.push("/ido");
            }}>
            IDO
          </div> */}
          <div className="ds-dropdown ds-dropdown-end">
            <label tabIndex={0} className="ds-btn m-1 bg-white bg-opacity-30">
              Language
            </label>
            <ul
              tabIndex={0}
              className="ds-dropdown-content ds-menu p-2 shadow bg-base-100 rounded-box w-52">
              <li onClick={() => setLanguage("en")}>
                <a>English</a>
              </li>
              <li onClick={() => setLanguage("cn")}>
                <a>中文(简体)</a>
              </li>
              <li onClick={() => setLanguage("jp")}>
                <a>日本語</a>
              </li>
            </ul>
          </div>
          {/* <div className=' h-[40px] px-[40px] leading-[40px] border-[#87F2F8] border rounded-full bg-[#d7f3fc] '>中文</div> */}
        </div>
      </div>
      {/* bannar */}
      <div
        className="h-auto bg-no-repeat hidden lg:block bg-cover lg:pb-[100px] xl:pb-[210px] 2xl:pb-[190px]"
        style={style.bannar}>
        {/* <div className="h-[950px] absolute z-0 backdrop-brightness-50 "></div> */}
        <div className=" lg:pt-[210px] xl:pt-[260px] 2xl:pt-[310px] z-10 px-[13%]">
          <div className="text-[#D7F3FC] lg:text-[40px] lg:mb-[40px] w-[auto]  inline-block bg-black bg-opacity-20 backdrop-blur-sm p-4">
            WFCA Infrastructure
          </div>
          <div className="text-[#D7F3FC] lg:text-[24px]  bg-black bg-opacity-20 backdrop-blur-sm  p-4">
            {t(
              "WFCA Infrastructure是一个基于区块链技术的基础设施，包括元宇宙NFT、专用链和DeFi等概念。\n使用去中心化的区块链特性，WFCA Infrastructure提供了一个安全、透明和高效的经济系统，为全球贸易和经济发展带来新机遇。"
            )}
          </div>
        </div>
      </div>

      <div className=" lg:pt-[210px] xl:pt-[260px] 2xl:pt-[310px] z-10 px-[13%] text-center pt-[120px] block lg:hidden">
        <div className="h-[40px] flex align items-center mx-[auto] justify-center mb-[40px]">
          <img
            className="rounded-full w-[40px] h-[40px] mr-[4px]"
            src="https://www.wfca.io/assets/img/logo.png"
            alt=""
          />
          <span className="text-white text-[20px] font-[700]">WFCA</span>
        </div>
        <div className="text-[#D7F3FC]   font-[700] mb-[30px]">
          WFCA Infrastructure
        </div>
        <div className="text-[#D7F3FC]">
          {t(
            "WFCA Infrastructure是一个基于区块链技术的基础设施，包括元宇宙NFT、专用链和DeFi等概念。\n使用去中心化的区块链特性，WFCA Infrastructure提供了一个安全、透明和高效的经济系统，为全球贸易和经济发展带来新机遇。"
          )}
        </div>
      </div>

      <div className="w-full ">
        <div className="h-[60px] lg:h-[140px] w-full bg-[#0f103c] "></div>
        <div className=" pb-[40px] bg-[#0f103c] text-[#fff] flex flex-col">
          <div className="text-[36px] leading-[36px] font-[700] text-center mb-[40px] ">
            IDO
          </div>
          <div className="w-[72%] text-[16px]  leading-[24px] mx-[auto]">
            <p className=" ">
              {t(
                "日本上市集团，百年稀有矿企数字通证WFCA正式启动，本次STO除了将行业利润提前释放之外，更是预示着WFCA产能通证化、销售智能化等全面链改推行。同时WFCA与元宇宙数据公链MNT超级生态+MND万人社群强强联手，更是夯实了Web3矿业第一股的发展预期，为即将到来的万物互联时代做出杰出贡献。目前WFCA已引起行业头部资本NEX、EVG等头部资本的紧密关注。\nIDO 火热进行中，持有WFCA，把握进入区块链的未来"
              )}
            </p>
          </div>
        </div>

        <div className="mb-[60px] w-full h-[60px]  flex justify-center">
          <button
            className="ds-btn m-1 bg-white bg-opacity-30"
            onClick={() => {
              router.push("/ido");
            }}>
            {" "}
            {t("进入")}
          </button>
        </div>

        <div className="flex  justify-between  w-full  text-white mb-[60px] lg:mb-[100px] px-[20%] z-10">
          <div
            className="text-[16px] flex  flex-col justify-center items-center lg:text-[24px] leading-[24px] font-[700] hover:cursor-pointer"
            onClick={() => {
              gotopdf(
                "https://ipfs.thirdwebcdn.com/ipfs/QmRzGcM1KNMncKy7LHeQGFJB1mvpgftyAREMRTiPD7xVYC/WFCA.pdf"
              );
            }}>
            <Image
              src={icontips}
              alt="Album"
              className="mb-[20px] h-[50px] w-[35px] object-cover lg:mb-[40px]"
            />
            <div>{t("项目介绍")}</div>
          </div>
          <div
            className="text-[16px] flex  flex-col justify-center items-center lg:text-[24px] leading-[24px] font-[700] hover:cursor-pointer"
            onClick={() => {
              gotopdf("https://dde-fintech.com/");
            }}>
            <Image
              src={iconroom}
              alt="Album"
              className="mb-[20px] h-[50px] w-[35px] object-cover lg:mb-[40px]"
            />
            <div>{t("企业介绍")}</div>
          </div>

          <div
            className="text-[16px] flex  flex-col justify-center items-center lg:text-[24px] leading-[24px] font-[700] hover:cursor-pointer"
            onClick={() => {
              gotopdf(
                "https://ipfs.thirdwebcdn.com/ipfs/QmRzGcM1KNMncKy7LHeQGFJB1mvpgftyAREMRTiPD7xVYC/WFCA.pdf"
              );
            }}>
            <Image
              src={iconbook}
              alt="Album"
              className="mb-[20px] h-[50px] w-[35px] object-cover lg:mb-[40px]"
            />
            <div>{t("白皮书")}</div>
          </div>
        </div>

        {/* 视频 */}
        <div className="lg:h-[auto] text-white flex flex-col-reverse lg:flex-row lg:w-full  items-center mb-[60px]  z-0 lg:px-[268px]">
          {/* <video src="https://ipfs.thirdwebcdn.com/ipfs/QmTPrAoZe1KYcnfuiEj6dvQJyE4ZfcQdb5pu5qoCUAjXE1/aae3931166f2b972b4ccabf1c4c4cb27.mp4"
         className="h-[360px] w-[640px] object-cover mr-[40px]"
        ></video> */}
          {/* <div className=" flex-[2] mt-[20px] lg:mt-[0]  lg:px-[0]    object-cover lg:mr-[40px] overflow-hidden  items-center  hidden lg:flex">
            <Player
              autoPlay={true}
              playsInline={true}
              src="https://ipfs.thirdwebcdn.com/ipfs/QmRu6guvUJhpaSJEKiGYipgCYFjXKe9ww9ANbaFgYqw353/WFCA.mp4"
              poster="https://dde-fintech.com/wp-content/uploads/2021/06/AdobeStock_279568799-scaled.jpeg">
              <ControlBar autoHide={false} >
              <ReplayControl seconds={10} order={1.1} />
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
              <VolumeMenuButton />
            </ControlBar>
            </Player>
          </div> */}

          <div className="bg-[#0f103c] lg:w-[50%] w-full  mt-[20px] lg:mt-[0]  lg:px-[0]    object-cover lg:mr-[40px] ">
            <Player
              autoPlay
              // playsInline={true}
              // preload="auto"
              ref={(player) => {
                setCurrentPlayer(player);
              }}>
              <source src="https://ipfs.thirdwebcdn.com/ipfs/QmRu6guvUJhpaSJEKiGYipgCYFjXKe9ww9ANbaFgYqw353/WFCA.mp4" />
            </Player>
          </div>

          {/* <Image
          src={bannar}
          alt="Album"
        /> */}
          <div className=" flex-1 ">
            <div className="mb-[20px] text-[20px] lg:text-[36px] font-[700] leading-[30px] lg:mb-[40px] text-center ">
              {t("我们的使命")}
            </div>
            <div className="w-full text-center  text-[14px] leading-[40px] mx-[auto] px-12">
              {t("通过世界最先端的区块链技术\n以WFCA为工具，达到利益最大化。")}
            </div>
          </div>
        </div>
        <div className="w-full h-[auto] flex justify-center">
          <p className="text-4xl text-blue-300 text-center">
            WFCA WEB3.0 PLATFORM
          </p>
        </div>
        {/* 缩放图标 */}
        <div
          className=" h-[500px] w-full  mb-[60px]  overflow-auto flex flex-col justify-center"
          style={{ showsHorizontalScrollIndicator: false }}>
          <div className="ml-[350px] mr-[350px] lg:mr-0 lg:ml-0 flex flex-row justify-around w-full space-x-[50px] items-center">
            <Image
              src={Mask1}
              alt="Album"
              className=" h-[300px] w-[300px] transition ease-in-out delay-50  duration-300 hover:transform  hover:scale-[120%] rounded-3xl"
            />
            <Image
              src={Mask2}
              alt="Album"
              className=" h-[350px] w-[350px]  transition ease-in-out delay-50  duration-300  hover:transform  hover:scale-[120%]  rounded-3xl"
            />
            <Image
              src={Mask3}
              alt="Album"
              className="h-[300px] w-[300px]  transition ease-in-out delay-50  duration-300  hover:transform hover:scale-[120%]  rounded-3xl"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row  lg:w-full  lg:justify-between  text-white items-center mb-[60px] lg:mb-[140px] lg:px-[268px]">
          <div className="flex-1  text-left lg:text-center">
            <div className=" mx-[auto] text-[22px] lg:w-full lg:text-[36px] leading-[36px]  mb-[20px] lg:mb-[40px]">
              Metaverse
            </div>
            <div className="mb-[20px] text-[14px]  mx-[auto] lg:mb-[0] lg:text-[16px] leading-[16px] flex justify-between w-full h-[80px] lg:h-[16px] flex-col lg:flex-row">
              <span>Pursuit of reality</span>
              <span>Web 3.0 Community</span>
              <span>Virtual Market Building</span>
            </div>
          </div>
          <Image
            src={metaverse}
            alt="Album"
            className=" w-[72%] mx-[auto]  lg:mx-[0] lg:ml-[140px] lg:w-1/3 "
          />
        </div>

        <div className="flex flex-col lg:flex-row  lg:w-full  lg:justify-between  text-white items-center mb-[60px] lg:mb-[140px] lg:px-[268px]">
          <div className="flex-1">
            <div className=" mx-[auto] text-[22px] lg:w-full lg:text-[36px] leading-[36px]  mb-[20px] lg:mb-[40px]">
              DMW
            </div>
            <div className="text-[16px] leading-[16px] flex justify-between flex-col">
              <span className="mb-[20px] lg:mb-[32px]">
                Decentralized NFT platform
              </span>
              <span className="mb-[20px] lg:mb-[32px]">
                Developing the Anime NFT Market
              </span>
              <span className="mb-[20px] lg:mb-[0]">
                Solving Digital Bottlenecks
              </span>
            </div>
          </div>
          <Image src={dmw} alt="Album" className="w-[72%] lg:w-[36%] " />
        </div>

        <div className="flex flex-col lg:flex-row lg:w-full  justify-between  text-white lg:items-center mb-[60px] lg:mb-[151px] lg:px-[268px]">
          <Image
            src={decentralized}
            alt="Album"
            className="hidden lg:block  lg:w-1/3  "
          />
          <div className="mx-[auto] mb-[20px] lg:w-[auto]  lg:mx-[0] lg:mb-[0] ">
            <div className=" mx-[auto] text-[22px] lg:w-full lg:text-[36px] leading-[36px]  mb-[20px] lg:mb-[40px]">
              Decentralized Finance
            </div>
            <div className="text-[16px] leading-[16px] flex justify-between flex-col">
              <span className="mb-[20px] lg:mb-[32px]">
                Simple and easy to use
              </span>
              <span className="mb-[20px] lg:mb-[32px]">
                Instant Exchange with one tap
              </span>
              <span>Easy crypto asset Management</span>
            </div>
          </div>
          <Image
            src={decentralized}
            alt="Album"
            className=" block lg:hidden  w-[72%] mx-[auto]"
          />
        </div>

        <div className="text-white text-[20px] lg:text-[36px] leading-[36px] text-center font-[700] mb-[24px] lg:px-[268px]">
          ROADMAP
        </div>
        <div className="w-[72%] lg:w-[auto] mx-[auto] lg:mx-[0] text-white text-[16px] leading-[24px] text-center  mb-[40px]">
          This is the roadmap that shows the progression of our services
        </div>

        <Image src={jindu} alt="Album" className="mb-[40px]" />
        <Image src={bigbannar} alt="Album" className="mb-[40px]" />
      </div>

      <div className="block lg:hidden text-white lg:px-[268px]">
        <div className=" w-full mx-[auto] flex flex-col justify-center items-center mb-[40px]">
          <div className="w-[auto] h-[40px] flex align items-center mb-[20px]">
            <img
              className="rounded-full w-[40px] h-[40px] mr-[24px]"
              src="https://www.wfca.io/assets/img/logo.png"
              alt=""
            />
            <span className="text-white text-[22px]">WFCA</span>
          </div>
          <div className="flex">
            <img
              className="w-[40px] h-[40px] mr-[24px]"
              src="https://www.wfca.io/assets/img/icon-twitter-footer.svg"
              alt=""
            />
            <img
              className="w-[40px] h-[40px]"
              src="https://www.wfca.io/assets/img/icon-github-footer.svg"
              alt=""
            />
          </div>
        </div>

        <div className="flex  justify-between px-[20px] bg-[#000c32] pt-[20px] pb-20 lg:px-[268px]">
          <div style={{ flex: 2 }}>
            <div className="text-[12px] font-[700] mb-[20px]">PRODUCTS</div>
            <div className="text-[10px] ">
              <a
                href="https://www.animemeta.io/#/home"
                className="mb-[15px] block">
                Metaverse
              </a>
              <a
                href="https://www.animemeta.io/#/home"
                className="mb-[15px] block">
                NFT Marketplace
              </a>
              {/* <div className="mb-[15px]">DeFi</div> */}
            </div>
          </div>

          <div style={{ flex: 2 }}>
            <div className="text-[12px] font-[700] mb-[20px]">COMMUNITY</div>
            <div className="text-[10px]">
              <a
                href="https://twitter.com/wfca_global"
                className="mb-[15px] block">
                Twitter
              </a>
              <a
                href="https://twitter.com/ANIMETA_NFT"
                className="mb-[15px] block">
                Twitter(NFT)
              </a>
              <a
                href="https://github.com/ANIMETA-GLOBAL"
                className="mb-[15px] block">
                Github
              </a>
            </div>
          </div>

          <div style={{ flex: 2 }}>
            <div
              className="text-[10
              px] mb-[20px]">
              LINKS & Partners
            </div>
            <div className="text-[10px]">
              <a href="https://dde-fintech.com/" className="mb-[15px] block">
                DDE FINTECH HOLDING
              </a>
              <a href="http://99hln.com/" className="mb-[15px] block">
                99 Hualian
              </a>
              <a
                href="https://etherscan.io/token/0xae4533189C7281501F04bA4b7c37e3ADeD402902"
                className="mb-[15px] block">
                Etherscan
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[auto] fixed bottom-0 bg-blue-900 bg-opacity-60 backdrop-blur-sm">
          <div className="flex w-full pl-[20px] pr-[20px] h-[60px] justify-between lg:pl-[80px] lg:pr-[80px] items-center ">
            <div className="w-[60px] h-[30px] flex align items-center ">
              <img
                className="rounded-full w-[30px] h-[30px] mr-[24px]"
                src="https://www.wfca.io/assets/img/logo.png"
                alt=""
              />
              <span className="text-white text-[22px]">WFCA</span>
            </div>
            <div className="flex justify-between text-[#333] items-center">
              <div
                className="ds-btn m-1 bg-white bg-opacity-30"
                onClick={() => {
                  router.push("/ido");
                }}>
                IDO
              </div>
              {/* <div className=' h-[40px] px-[40px] leading-[40px] border-[#87F2F8] border rounded-full bg-[#d7f3fc] '>中文</div> */}
            </div>
          </div>
        </div>
      </div>

      <div
        style={style.bannar2}
        className="w-full h-[300px] text-white pt-[40px] lg:px-40  justify-center hidden lg:flex">
        <div className="w-full  flex justify-between flex-col lg:flex-row">
          <div className="flex  justify-between flex-1 mr-[51px]">
            <div>
              <div className="text-[16px] font-[700] mb-[40px]">
                {t("产品")}
              </div>
              <div className="text-[14px] font-[700]  leading-[18px]">
                <a
                  href="https://www.animemeta.io/#/home"
                  className="mb-[40px] block">
                  Metaverse
                </a>
                <a
                  href="https://www.animemeta.io/#/home"
                  className="mb-[40px] block">
                  NFT Marketplace
                </a>
                {/* <div className="mb-[40px]">DeFi</div> */}
              </div>
            </div>

            <div>
              <div className="text-[16px] font-[700] mb-[40px]">COMMUNITY</div>
              <div className="text-[14px] font-[700]  leading-[18px]">
                <a
                  href="https://twitter.com/wfca_global"
                  className="mb-[40px] block">
                  Twitter
                </a>
                <a
                  href="https://twitter.com/ANIMETA_NFT"
                  className="mb-[40px] block">
                  Twitter(NFT)
                </a>
                <a
                  href="https://github.com/ANIMETA-GLOBAL"
                  className="mb-[40px] block">
                  Github
                </a>
              </div>
            </div>

            <div>
              <div className="text-[16px] font-[700] mb-[40px] flex-[3]">
                LINKS & Partners
              </div>
              <div className="text-[14px] font-[700] leading-[18px]">
                <a href="https://dde-fintech.com/" className="mb-[40px] block">
                  DDE FINTECH HOLDING
                </a>
                <a href="http://99hln.com/" className="mb-[40px] block">
                  99 Hualian
                </a>
                <a
                  href="https://etherscan.io/token/0xae4533189C7281501F04bA4b7c37e3ADeD402902"
                  className="mb-[40px] block">
                  Etherscan
                </a>
              </div>
            </div>
          </div>

          <div className="">
            <div className="w-[60px] h-[60px] flex align items-center mb-[40px]">
              <img
                className="rounded-full w-[60px] h-[60px] mr-[24px]"
                src="https://www.wfca.io/assets/img/logo.png"
                alt=""
              />
              <span className="text-white text-[32px]">WFCA</span>
            </div>
            <div className="flex">
              <img
                className="w-[40px] h-[40px] mr-[40px]"
                src="https://www.wfca.io/assets/img/icon-twitter-footer.svg"
                alt=""
              />
              <img
                className="w-[40px] h-[40px]"
                src="https://www.wfca.io/assets/img/icon-github-footer.svg"
                alt=""
              />
            </div>
            <div className="mt-[40px] text-white font-[700]">
              WFCA. ALL RIGHTS RESERVED.
            </div>
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
    backgroundImage: `url(${bgfooter.src})`,
    backgroundSize: "100%,100%",
  },
  Mask1: {
    backgroundImage: `url(${Mask1.src})`,
    backgroundSize: "100%,100%",
  },
  Mask2: {
    backgroundImage: `url(${Mask2.src})`,
    backgroundSize: "100%,100%",
  },
  Mask3: {
    backgroundImage: `url(${Mask3.src})`,
    backgroundSize: "100%,100%",
  },
};
