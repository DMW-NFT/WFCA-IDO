import Image from "next/image";
import { Inter } from "next/font/google";
import bannar from "../../public/image/bgheroreal.png";
import Group45 from "../../public/image/Group45.png";
import Group46 from "../../public/image/Group46.png";
import Mask3 from "../../public/image/Mask3.png";
import Mask2 from "../../public/image/Mask2.png";
import Mask1 from "../../public/image/Mask1.png";
import decentralized from "../../public/image/img-decentralized-finance 1.png";
import dmw from "../../public/image/Dmw2.png";
import jindu from "../../public/image/jindu.png";
import bgfooter from "../../public/image/bgfooter.png";
import iconbook from "../../public/image/iconbook.png";
import iconroom from "../../public/image/iconroom.png";
import icontips from "../../public/image/icontips.png";
import metaverse from "../../public/image/img-metaverse 1.png";
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

export default function Home() {
  const gotopdf = (url:string) => {
    window.open(url)
  }
  return (
    <div className=" w-full h-auto bg-[#0f103c] lg:pb-[0]">
      {/* header */}
      <div className="hidden lg:flex w-full pl-[20px] pr-[20px] h-[104px] bg-black  justify-between lg:pl-[80px] lg:pr-[80px] items-center ">
        <div className="w-[60px] h-[60px] flex align items-center ">
          <img
            className="rounded-full w-[60px] h-[60px] mr-[24px]"
            src="https://www.wfca.io/assets/img/logo.png"
            alt=""
          />
          <span className="text-white text-[32px]">WFCA</span>
        </div>
        <div className="flex justify-between text-[#333] items-center">
          <div className="hover:cursor-pointer font-[700] h-[40px] px-[40px] lg:h-[60px] lg:px-[64px] lg:leading-[64px] leading-[40px] border rounded-[8px] bg-[#f4f4f4]">
            IDO
          </div>
          {/* <div className=' h-[40px] px-[40px] leading-[40px] border-[#87F2F8] border rounded-full bg-[#d7f3fc] '>中文</div> */}
        </div>
      </div>
      {/* bannar */}
      <div
        className="h-[auto] bg-no-repeat hidden lg:block bg-cover lg:pb-[100px] xl:pb-[210px] 2xl:pb-[190px]"
        style={style.bannar}>
        {/* <div className="h-[950px] absolute z-0 backdrop-brightness-50 "></div> */}
        <div className=" lg:pt-[210px] xl:pt-[260px] 2xl:pt-[310px] z-10 px-[13%]">
          <div className="text-[#D7F3FC] lg:text-[40px] lg:mb-[40px]  ">
            WFCA Infrastructure
          </div>
          <div className="text-[#D7F3FC] lg:text-[24px]">
            Metaverse,NFT,Proprietary Chains,DeFi.
            <br />
            Establishment of a unique economic zone
            <br />
            utilizing these resources.
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
          Metaverse,NFT,Proprietary Chains,DeFi.
          <br />
          Establishment of a unique economic zone
          <br />
          utilizing these resources.
        </div>
      </div>


      <div className="w-full lg:px-40">
        <div className="h-[60px] lg:h-[140px] w-full bg-[#0f103c] "></div>
        <div className=" pb-[40px] bg-[#0f103c] text-[#fff] flex flex-col">
          <div className="text-[36px] leading-[36px] font-[700] text-center mb-[40px] ">
            IDO
          </div>
          <div className="w-[72%] text-[16px]  leading-[24px] mx-[auto]">
            <p className=" ">
              这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，
            </p>
          </div>
        </div>

        <div className="mb-[60px] w-[160px] h-[60px] leading-[60px] text-center rounded-lg border  border-[#666] lg:mb-[150px] bg-[#f4f4f4] mx-[auto] hover:cursor-pointer">
          进入
        </div>

        <div className="flex  justify-between  w-full  text-white mb-[60px] lg:mb-[140px] px-[20%] z-10">
          <div className="text-[16px] flex  flex-col justify-center items-center lg:text-[24px] leading-[24px] font-[700] hover:cursor-pointer"
           onClick={()=>{
            gotopdf('https://dde-fintech.com/')
          }}
          >
            <Image
              src={icontips}
              alt="Album"
              className="mb-[20px] h-[50px] w-[35px] object-cover lg:mb-[40px]"
            />
            <div>项目介绍</div>
          </div>
          <div className="text-[16px] flex  flex-col justify-center items-center lg:text-[24px] leading-[24px] font-[700] hover:cursor-pointer"
           onClick={()=>{
            gotopdf('https://dde-fintech.com/')
          }}
          >
            <Image
              src={iconroom}
              alt="Album"
              className="mb-[20px] h-[50px] w-[35px] object-cover lg:mb-[40px]"
            />
            <div>企业介绍</div>
          </div>

          <div className="text-[16px] flex  flex-col justify-center items-center lg:text-[24px] leading-[24px] font-[700] hover:cursor-pointer" onClick={()=>{
            gotopdf('https://ipfs.thirdwebcdn.com/ipfs/QmRzGcM1KNMncKy7LHeQGFJB1mvpgftyAREMRTiPD7xVYC/WFCA.pdf')
          }}>
            <Image
              src={iconbook}
              alt="Album"
              className="mb-[20px] h-[50px] w-[35px] object-cover lg:mb-[40px]"
            />
            <div>白皮书</div>
          </div>
        </div>

        {/* 视频 */}
        <div className="h-[360px]  text-white flex flex-col-reverse lg:flex-row lg:w-full  items-center mb-[60px] lg:mb-[107px] z-0">
          {/* <video src="https://ipfs.thirdwebcdn.com/ipfs/QmTPrAoZe1KYcnfuiEj6dvQJyE4ZfcQdb5pu5qoCUAjXE1/aae3931166f2b972b4ccabf1c4c4cb27.mp4"
         className="h-[360px] w-[640px] object-cover mr-[40px]"
        ></video> */}
          <div className=" w-[675px]  px-[20%] mt-[20px] lg:mt-[0]  lg:px-[0]    object-cover lg:mr-[40px] overflow-hidden  items-center  hidden lg:flex">
            <Player
              autoPlay={true}
              playsInline={true}
              src="https://ipfs.thirdwebcdn.com/ipfs/QmRu6guvUJhpaSJEKiGYipgCYFjXKe9ww9ANbaFgYqw353/WFCA.mp4"
              poster="https://dde-fintech.com/wp-content/uploads/2021/06/AdobeStock_279568799-scaled.jpeg"
            >

              {/* <ControlBar autoHide={false} >
              <ReplayControl seconds={10} order={1.1} />
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
              <VolumeMenuButton />
            </ControlBar> */}
            </Player>
          </div>

          <div className="h-[360px] w-full px-[20%] mt-[20px] lg:mt-[0]  lg:px-[0]    object-cover lg:mr-[40px] overflow-hidden  items-center flex lg:hidden">
            <Player
              autoPlay={true}
              playsInline={true}
              src="https://ipfs.thirdwebcdn.com/ipfs/QmRu6guvUJhpaSJEKiGYipgCYFjXKe9ww9ANbaFgYqw353/WFCA.mp4"
              poster="https://dde-fintech.com/wp-content/uploads/2021/06/AdobeStock_279568799-scaled.jpeg"
            >

              {/* <ControlBar autoHide={false} >
              <ReplayControl seconds={10} order={1.1} />
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
              <VolumeMenuButton />
            </ControlBar> */}
            </Player>
          </div>

          {/* <Image
          src={bannar}
          alt="Album"
        /> */}
          <div>
            <div className="text-[20px] lg:text-[36px] font-[700] leading-[30px] mb-[40px] text-center ">
              视频标题
            </div>
            <div className="w-[72%] lg:max-w-[720px] text-[14px] leading-[24px] mx-[auto]">
              这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，
            </div>
          </div>
        </div>

        {/* 缩放图标 */}
        <div className=" h-[auto]   lg:pl-[0] flex justify-between w-full  mb-[60px] lg:mb-[186px] overflow-auto lg:overflow-hidden "
          style={{ showsHorizontalScrollIndicator: false }}
        >
          <Image
            src={Mask1}
            alt="Album"
            className="ml-[20px] lg:ml-[0] mr-[20px] lg:mr-[0] w-[250px] lg:w-1/4 lg:hover:transform  lg:hover:scale-[120%]"
          />
          <Image
            src={Mask2}
            alt="Album"
            className="mr-[20px] lg:mr-[0] w-[250px] lg:w-1/4 lg:hover:transform  lg:hover:scale-[120%]"
          />
          <Image
            src={Mask3}
            alt="Album"
            className="mr-[20px] lg:mr-[0] w-[250px] lg:w-1/4 lg:hover:transform  lg:hover:scale-[120%]"
          />
        </div>

        <div className="flex flex-col lg:flex-row  lg:w-full  lg:justify-between  text-white items-center mb-[60px] lg:mb-[140px]">
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
          <Image src={metaverse} alt="Album" className=" w-[72%] mx-[auto]  lg:mx-[0] lg:ml-[140px] lg:w-1/3 " />
        </div>

        <div className="flex flex-col lg:flex-row  lg:w-full  lg:justify-between  text-white items-center mb-[60px] lg:mb-[140px]">
          <div className="flex-1">
            <div className=" mx-[auto] text-[22px] lg:w-full lg:text-[36px] leading-[36px]  mb-[20px] lg:mb-[40px]">DMW</div>
            <div className="text-[16px] leading-[16px] flex justify-between flex-col">
              <span className="mb-[20px] lg:mb-[32px]">Decentralized NFT platform</span>
              <span className="mb-[20px] lg:mb-[32px]">Developing the Anime NFT Market</span>
              <span className="mb-[20px] lg:mb-[0]" >Solving Digital Bottlenecks</span>
            </div>
          </div>
          <Image src={dmw} alt="Album" className="w-[72%] lg:w-[36%] " />
        </div>

        <div className="flex flex-col lg:flex-row lg:w-full  justify-between  text-white lg:items-center mb-[60px] lg:mb-[151px]">
          <Image src={decentralized} alt="Album" className="hidden lg:block  lg:w-1/3  " />
          <div className="mx-[auto] mb-[20px] lg:w-[auto]  lg:mx-[0] lg:mb-[0]">
            <div className=" mx-[auto] text-[22px] lg:w-full lg:text-[36px] leading-[36px]  mb-[20px] lg:mb-[40px]">
              Decentralized Finance
            </div>
            <div className="text-[16px] leading-[16px] flex justify-between flex-col">
              <span className="mb-[20px] lg:mb-[32px]">Simple and easy to use</span>
              <span className="mb-[20px] lg:mb-[32px]">Instant Exchange with one tap</span>
              <span>Easy crypto asset Management</span>
            </div>
          </div>
          <Image src={decentralized} alt="Album" className=" block lg:hidden  w-[72%] mx-[auto]" />
        </div>

        <div className="text-white text-[20px] lg:text-[36px] leading-[36px] text-center font-[700] mb-[24px]">
          ROADMAP
        </div>
        <div className="w-[72%] lg:w-[auto] mx-[auto] lg:mx-[0] text-white text-[16px] leading-[24px] text-center  mb-[40px]">
          This is the roadmap that shows the progression of our services
        </div>

        <Image src={jindu} alt="Album" className="mb-[40px]" />

        <div className="flex flex-col lg:flex-row justify-between text-white w-full  mb-[60px] lg:mb-[140px]">
          <div className="flex flex-col items-center mb-[20px] lg:mb-[0]">
            <div>Blockchain</div>
            <img
              className="w-[220px] h-[64px] mt-[10px] lg:mt-[40px]"
              src="https://www.wfca.io/assets/img/logo-ethereum.svg"
              alt=""
            />
          </div>

          <div className="flex flex-col items-center mb-[20px] lg:mb-[0]">
            <div className="mb-[20px] lg:mb-[40px]">Team</div>
            <img
              className="mb-[20px] lg:mb-[40px] max-w-[60%] "
              src="https://www.wfca.io/assets/img/logo-dde.png"
              alt=""
            />
            <img
              className="max-w-[60%]"
              src="https://www.wfca.io/assets/img/logo-99hualian.svg"
              alt=""
            />
          </div>

          <div className="flex flex-col items-center mb-[20px] lg:mb-[0]">
            <div className="mb-[20px] lg:mb-[40px]">Exchange</div>
            <div className="w-[220px] max-w-[60%] h-[55px] bg-[#003469] text-white leading-[55px] text-center font-[700]">
              Coming Soon
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-[20px] lg:mb-[40px]">Explorer</div>
            <div className="bg-[#fff] px-[10px]">
              <img
                className="w-[200px] h-[64px] max-w-[60%] mx-[auto]"
                src="https://www.wfca.io/assets/img/logo-etherscan.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden text-white">
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


        <div className="flex  justify-between px-[20px] bg-[#000c32] pt-[20px]">
          <div style={{ flex: 2 }}>
            <div className="text-[12px] font-[700] mb-[20px]">PRODUCTS</div>
            <div className="text-[10px] ">
              <a href="https://www.animemeta.io/#/home" className="mb-[15px] block">Metaverse</a>
              <a href="https://www.animemeta.io/#/home" className="mb-[15px] block">NFT Marketplace</a>
              {/* <div className="mb-[15px]">DeFi</div> */}
            </div>
          </div>

          <div style={{ flex: 2 }}>
            <div className="text-[12px] font-[700] mb-[20px]">COMMUNITY</div>
            <div className="text-[10px]">
              <a href="https://twitter.com/wfca_global" className="mb-[15px] block">Twitter</a>
              <a href="https://twitter.com/ANIMETA_NFT" className="mb-[15px] block">Twitter(NFT)</a>
              <a href="https://github.com/ANIMETA-GLOBAL" className="mb-[15px] block">Github</a>
            </div>
          </div>

          <div style={{ flex: 3 }}>
            <div className="text-[12px] font-[700] mb-[20px]">
              LINKS & Partners
            </div>
            <div className="text-[10px]">
              <a href="https://dde-fintech.com/" className="mb-[15px] block">DDE FINTECH HOLDING</a>
              <a href="http://99hln.com/" className="mb-[15px] block">99 Hualian</a>
              <a href="https://etherscan.io/token/0xae4533189C7281501F04bA4b7c37e3ADeD402902" className="mb-[15px] block">Etherscan</a>
            </div>
          </div>
        </div>


        <div className="w-full h-[auto]">
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
              <div className="font-[700] h-[40px] px-[40px] lg:h-[60px] lg:px-[64px] lg:leading-[64px] leading-[40px] border rounded-[8px] bg-[#f4f4f4]">
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
          <div className="flex  justify-between flex-1 mr-[351px]">
            <div>
              <div className="text-[24px] font-[700] mb-[40px]">PRODUCTS</div>
              <div className="text-[18px] font-[700]  leading-[18px]">
                <a href="https://www.animemeta.io/#/home" className="mb-[40px] block">Metaverse</a>
                <a href="https://www.animemeta.io/#/home" className="mb-[40px] block">NFT Marketplace</a>
                {/* <div className="mb-[40px]">DeFi</div> */}
              </div>
            </div>

            <div>
              <div className="text-[24px] font-[700] mb-[40px]">COMMUNITY</div>
              <div className="text-[18px] font-[700]  leading-[18px]">
                <a href="https://twitter.com/wfca_global" className="mb-[40px] block">Twitter</a>
                <a href="https://twitter.com/ANIMETA_NFT" className="mb-[40px] block">Twitter(NFT)</a>
                <a href="https://github.com/ANIMETA-GLOBAL" className="mb-[40px] block">Github</a>
              </div>
            </div>

            <div>
              <div className="text-[24px] font-[700] mb-[40px]">
                LINKS & Partners
              </div>
              <div className="text-[18px] font-[700] leading-[18px]">
                <a href="https://dde-fintech.com/" className="mb-[40px] block">DDE FINTECH HOLDING</a>
                <a href="http://99hln.com/" className="mb-[40px] block">99 Hualian</a>
                <a href="https://etherscan.io/token/0xae4533189C7281501F04bA4b7c37e3ADeD402902" className="mb-[40px] block">Etherscan</a>
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
};
