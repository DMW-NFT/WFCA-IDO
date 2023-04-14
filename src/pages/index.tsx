import Image from "next/image";
import { Inter } from "next/font/google";
import bannar from "../../public/image/bgheroreal.png";
import Group45 from "../../public/image/Group45.png";
import Group46 from "../../public/image/Group46.png";
import Mask3 from "../../public/image/Mask3.png";
import Mask2 from "../../public/image/Mask2.png";
import Mask1 from "../../public/image/Mask1.png";
import decentralized from "../../public/image/img-decentralized-finance 1.png";
import dmw from "../../public/image/dmw.jpg";
import jindu from "../../public/image/jindu.png";
import bgfooter from "../../public/image/bgfooter.png";
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
  return (
    <div className="w-full h-auto bg-[#0f103c] ">
      {/* header */}

      <div className="hidden lg:flex w-full pl-[20px] pr-[20px] h-[104px] bg-black  justify-between lg:pl-[80px] lg:pr-[80px] items-center ">
        <div className="w-[60px] h-[60px] flex align items-center ">
          <img
            className="rounded-full w-[60px] h-[60px] mr-[24px]"
            src="https://img2.baidu.com/it/u=2028084904,3939052004&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681405200&t=fbc2d1d351620d35cc88934b2cb9281c"
            alt=""
          />
          <span className="text-white text-[32px]">logo</span>
        </div>
        <div className="flex justify-between text-[#333] items-center">
          <div className="font-[700] h-[40px] px-[40px] lg:h-[60px] lg:px-[64px] lg:leading-[64px] leading-[40px] border rounded-[8px] bg-[#f4f4f4]">
            IDO
          </div>
          {/* <div className=' h-[40px] px-[40px] leading-[40px] border-[#87F2F8] border rounded-full bg-[#d7f3fc] '>中文</div> */}
        </div>
      </div>
      {/* bannar */}
      <div
        className="  max-h-[950px]bg-no-repeat hidden lg:block"
        style={style.bannar}>
        {/* <div className="h-[950px] absolute z-0 backdrop-brightness-50 "></div> */}
        <div className="pt-[90px] lg:pt-[310px] lg:pl-[260px] z-10">
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

      <div className="w-full lg:px-40">
        <div className="h-[140px] w-full bg-[#0f103c] hidden lg:block"></div>
        <div className=" pb-[40px] bg-[#0f103c] text-[#fff] flex flex-col">
          <div className="text-[36px] leading-[36px] font-[700] text-center mb-[40px] ">
            IDO
          </div>
          <div className="w-[70%] text-[16px]  leading-[24px] ">
            <p className=" text-center">
              这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，
            </p>
          </div>
        </div>

        <div className="w-[160px] h-[60px] leading-[60px] text-center rounded-lg border  border-[#666] mb-[150px] bg-[#f4f4f4]">
          进入
        </div>

        <div className="flex  justify-between  w-full   text-white mb-[140px]">
          <div className="flex  flex-col justify-center items-center text-[24px] leading-[24px] font-[700]">
            <Image
              src={Group45}
              alt="Album"
              className="h-[200px] w-[200px] object-cover mb-[40px]"
            />
            <div>项目介绍</div>
          </div>
          <div className="flex  flex-col justify-center items-center text-[24px] leading-[24px] font-[700]">
            <Image
              src={Group45}
              alt="Album"
              className="h-[200px] w-[200px] object-cover mb-[40px]"
            />
            <div>企业介绍</div>
          </div>

          <div className="flex  flex-col justify-center items-center text-[24px] leading-[24px] font-[700]">
            <Image
              src={Group45}
              alt="Album"
              className="h-[200px] w-[200px] object-cover mb-[40px]"
            />
            <div>白皮书</div>
          </div>
        </div>

        {/* 视频 */}
        <div className="h-[360px] text-white flex flex-col-reverse lg:flex-row lg:w-full  items-center mb-[107px]">
          {/* <video src="https://ipfs.thirdwebcdn.com/ipfs/QmTPrAoZe1KYcnfuiEj6dvQJyE4ZfcQdb5pu5qoCUAjXE1/aae3931166f2b972b4ccabf1c4c4cb27.mp4"
         className="h-[360px] w-[640px] object-cover mr-[40px]"
        ></video> */}
          <div className="h-[360px] w-full object-cover mr-[40px] overflow-hidden">
            <Player
              autoPlay={true}
              playsInline={true}
              src="https://ipfs.thirdwebcdn.com/ipfs/QmTPrAoZe1KYcnfuiEj6dvQJyE4ZfcQdb5pu5qoCUAjXE1/aae3931166f2b972b4ccabf1c4c4cb27.mp4"
              poster="https://video-react.js.org/assets/poster.png">
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
            <div className="text-[36px] font-[700] leading-[30px] mb-[40px] text-center ">
              视频标题
            </div>
            <div className="max-w-[720px] text-[14px] leading-[24px]">
              这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，
            </div>
          </div>
        </div>

        {/* 缩放图标 */}
        <div className="flex justify-around w-full  mb-[186px]">
          <Image
            src={Mask1}
            alt="Album"
            className="w-1/4 hover:transform  hover:scale-[120%]"
          />
          <Image
            src={Mask2}
            alt="Album"
            className="w-1/4 hover:transform  hover:scale-[120%]"
          />
          <Image
            src={Mask3}
            alt="Album"
            className="w-1/4 hover:transform  hover:scale-[120%]"
          />
        </div>

        <div className="lg:w-full flex justify-between  text-white items-center mb-[140px]">
          <div className="flex-1">
            <div className="text-[36px] leading-[36px] text-center mb-[40px]">
              Metaverse
            </div>
            <div className="text-[16px] leading-[16px] flex justify-between">
              <span>Pursuit of reality</span>
              <span>Web 3.0 Community</span>
              <span>Virtual Market Building</span>
            </div>
          </div>
          <Image src={metaverse} alt="Album" className="w-1/3 " />
        </div>

        <div className="lg:w-full flex justify-between  text-white items-center mb-[140px]">
          <div className="flex-1">
            <div className="text-[36px] leading-[36px]  mb-[44px]">DMW</div>
            <div className="text-[16px] leading-[16px] flex justify-between flex-col">
              <span className="mb-[32px]">Decentralized NFT platform</span>
              <span className="mb-[32px]">Developing the Anime NFT Market</span>
              <span>Solving Digital Bottlenecks</span>
            </div>
          </div>
          <Image src={dmw} alt="Album" className="w-1/4 mr-[100px]" />
        </div>

        <div className="lg:w-full flex justify-between  text-white items-center mb-[151px]">
          <Image src={decentralized} alt="Album" className="w-1/3  " />
          <div className="">
            <div className="text-[36px] leading-[36px]  mb-[44px]">
              Decentralized Finance
            </div>
            <div className="text-[16px] leading-[16px] flex justify-between flex-col">
              <span className="mb-[32px]">Simple and easy to use</span>
              <span className="mb-[32px]">Instant Exchange with one tap</span>
              <span>Easy crypto asset Management</span>
            </div>
          </div>
        </div>

        <div className="text-white text-[36px] leading-[36px] text-center font-[700] mb-[24px]">
          ROADMAP
        </div>
        <div className="text-white text-[16px] leading-[16px] text-center  mb-[40px]">
          This is the roadmap that shows the progression of our services
        </div>

        <Image src={jindu} alt="Album" className="mb-[40px]" />

        <div className="flex flex-col lg:flex-row justify-between text-white w-full  mb-[140px]">
          <div className="flex flex-col items-center">
            <div>Blockchain</div>
            <img
              className="w-[220px] h-[64px] mt-[40px]"
              src="https://www.wfca.io/assets/img/logo-ethereum.svg"
              alt=""
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-[40px]">Team</div>
            <img
              className="mb-[40px]"
              src="https://www.wfca.io/assets/img/logo-dde.png"
              alt=""
            />
            <img
              src="https://www.wfca.io/assets/img/logo-99hualian.svg"
              alt=""
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-[40px]">Exchange</div>
            <div className="w-[220px] h-[55px] bg-[#003469] text-white leading-[55px] text-center font-[700]">
              Coming Soon
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-[40px]">Explorer</div>
            <div className="bg-[#fff] px-[10px]">
              <img
                className="w-[220px] h-[64px]"
                src="https://www.wfca.io/assets/img/logo-etherscan.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={style.bannar2}
        className="w-full h-[300px] text-white pt-[40px] lg:px-40 flex justify-center">
        <div className="w-full  flex justify-between flex-col lg:flex-row">
          {/* <div className="flex justify-between flex-1 mr-[351px]">
            <div>
              <div className="text-[24px] font-[700] mb-[40px]">PRODUCTS</div>
              <div className="text-[18px] font-[700]  leading-[18px]">
                <div className="mb-[40px]">小标题名称</div>
                <div className="mb-[40px]">小标题名称</div>
                <div className="mb-[40px]">小标题名称</div>
              </div>
            </div>

            <div>
              <div className="text-[24px] font-[700] mb-[40px]">COMMUNITY</div>
              <div className="text-[18px] font-[700]  leading-[18px]">
                <div className="mb-[40px]">小标题名称</div>
                <div className="mb-[40px]">小标题名称</div>
                <div className="mb-[40px]">小标题名称</div>
              </div>
            </div>

            <div>
              <div className="text-[24px] font-[700] mb-[40px]">
                LINKS & Partners
              </div>
              <div className="text-[18px] font-[700] leading-[18px]">
                <div className="mb-[40px]">小标题名称</div>
                <div className="mb-[40px]">小标题名称</div>
                <div className="mb-[40px]">小标题名称</div>
              </div>
            </div>
          </div> */}

          <div className="w-full">
            <div className="w-[60px] h-[60px] flex align items-center mb-[40px]">
              <img
                className="rounded-full w-[60px] h-[60px] mr-[24px]"
                src="https://img2.baidu.com/it/u=2028084904,3939052004&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681405200&t=fbc2d1d351620d35cc88934b2cb9281c"
                alt=""
              />
              <span className="text-white text-[32px]">logo</span>
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
