import Image from 'next/image'
import { Inter } from 'next/font/google'
import bannar from "../../public/image/bgheroreal.png"
export default function Home() {
  return (
    <div className='w-full ' >
      {/* header */}
      <div className='w-full pl-[20px] pr-[20px] h-[104px] bg-black flex justify-between lg:pl-[80px] lg:pr-[80px] items-center invisible lg:visible'>
        <div className='w-[60px] h-[60px] flex align items-center '>
          <img className='rounded-full w-[60px] h-[60px] mr-[24px]' src="https://img2.baidu.com/it/u=2028084904,3939052004&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681405200&t=fbc2d1d351620d35cc88934b2cb9281c" alt="" />
          <span className='text-white text-[32px]'>logo</span>
        </div>
        <div className='flex justify-between text-[#333] items-center'>
          <div className='font-[700] h-[40px] px-[40px] lg:h-[60px] lg:px-[64px] lg:leading-[64px] leading-[40px] border rounded-[8px] bg-[#f4f4f4]'>IDO</div>
          {/* <div className=' h-[40px] px-[40px] leading-[40px] border-[#87F2F8] border rounded-full bg-[#d7f3fc] '>中文</div> */}
        </div>
      </div>

      {/* bannar */}
      <div className='lg:h-[950px]  bg-no-repeat flex  invisible lg:visible' style={style.bannar}>
        <div className='w-full h-[950px] absolute z-0 backdrop-brightness-50'></div>
        <div className='pt-[90px] lg:pt-[310px] lg:pl-[260px] z-10'>
          <div className='text-[#D7F3FC] lg:text-[40px] lg:mb-[40px]  '>WFCA Infrastructure</div>
          <div className='text-[#D7F3FC] lg:text-[24px]'>
            Metaverse,NFT,Proprietary Chains,DeFi.<br />
            Establishment of a unique economic zone<br />
            utilizing these resources.
          </div>
        </div>
      </div>

      <div className='h-[140px] w-full bg-[#0f103c]'></div>
      <div className=' pb-[40px] bg-[#0f103c] text-[#fff]'>
        <div className='text-[36px] leading-[36px] font-[700] text-center mb-[40px]'>IDO</div>
        <div className='w-[70%] text-[16px]  leading-[24px] mx-[auto]'>
          这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，这里是文案的地方，
        </div>
      </div>



      <div className='w-[160px] h-[60px] leading-[60px] text-center rounded-lg border mx-[auto] border-[#666] mb-[150px]'>
        进入
      </div>

      <div className='flex'>

      </div>

    </div>
  )
}

const style = {
  bannar: {
    backgroundImage: `url(${bannar.src})`,
    backgroundSize: '100%,100%',
  }
}
