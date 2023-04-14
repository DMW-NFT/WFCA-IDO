import Image from 'next/image'
import { Inter } from 'next/font/google'
import bannar from "../../public/image/bannar2.png"
import purchase from "../../public/image/purchase.png"
import btn from "../../public/image/btn.png"
import border from "../../public/image/border.png"


const arr = [1, 2, 3, 4]
export default function Home() {

    return (
        <div className='w-full h-[2408px] bg-[#0f103c] px-[260px] pt-[60px] text-white' style={style.bannar}>

            <div className='h-[60px] w-full flex justify-between items-center'>
                <div className='flex items-center'>
                    <img className='rounded-full w-[60px] h-[60px] mr-[24px]' src="https://img2.baidu.com/it/u=2028084904,3939052004&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681405200&t=fbc2d1d351620d35cc88934b2cb9281c" alt="" />
                    <span className='font-[700]'>logo</span>
                </div>
                <div className='text-[#333] w-[120px] h-[40px] leading-[40px] text-center rounded-lg border border-[#666]  bg-[#f4f4f4]'>
                    链接钱包
                </div>
            </div>

            <div
                className='mt-[80px] w-[458px] h-[58px] text-[#333] leading-[58px] text-center mx-[auto] mb-[40px]' style={style.bannar2}>
                <span className='text-[40px] font-[700]'>购买</span>
                <span className='text-[24px]'>（XXXX USDT/WFCA）</span></div>

            <div className='w-[458px] h-[60px] flex items-center mx-[auto] text-[16px]'>
                <span className='w-[100px]'>邀请人地址：</span>
                <input placeholder='请输入' style={{ outline: 'none' }} className='ring-[#f4f4f4] rounded-[4px] px-[10px] text-[#333] w-[309px] ml-[4px] h-[40px] leading-[40px] border boroer-[#f4f4f4]' type="text" />
            </div>

            <div className='w-[458px] h-[60px] flex items-center mx-[auto] text-[16px] mb-[40px]'>
                <span className='w-[100px] text-right'>购买数量：</span>
                <input placeholder='请输入' style={{ outline: 'none' }} className='ring-[#f4f4f4] rounded-[4px] px-[10px] text-[#333] w-[309px] ml-[4px] h-[40px] leading-[40px] border boroer-[#f4f4f4]' type="text" />
            </div>

            <div className='w-[202px] h-[48px] mx-[auto] text-center leading-[48px] mb-[140px]' style={style.bannar3}>
                购买
            </div>




            <div className='w-[1200px] h-[370px] mx-[auto] p-[40px] text-white mb-[40px]' style={style.bannar4} >
                <div className='text-[24px] leading-[24px] font-[700] text-center'>我的团队</div>
                <div className='px-[120px] flex justify-between'>
                    <span>哈希地址</span>
                    <span>数量</span>
                </div>
                <div className='text-white '>
                    {
                        arr.map((item, index) => (
                            <div className='flex justify-between px-[120px] h-[64px] leading-[64px] border-b' style={{ borderBottom: '1px solod ##f4f4f4' }}>
                                <div>GGGGGGGHHHQQQQQQQIIIQQQQWSFGHJERTYUIOJNGQW</div>
                                <div>x10</div>
                            </div>
                        ))

                    }
                </div>
            </div>

            <div className='w-[202px] h-[48px] mx-[auto] text-center leading-[48px] mb-[140px]' style={style.bannar3}>
                领取奖励
            </div>


            <div className='w-[1200px] h-[370px] mx-[auto] p-[40px] text-white mb-[40px]' style={style.bannar4} >
                <div className='text-[24px] leading-[24px] font-[700] text-center'>邀请规则</div>
                <div className='w-[600px] mx-[auto] text-[14px] leading-[24px] mt-[24px]'>
                    1.直推不满10个，推荐奖励百分之十，满十个奖励百分之十五。同时赠送5等级 NFT<br />
                    2.直推满20个，推荐奖励百分之二十，同时赠送4等级 NFT<br />
                    3.直推满30个，推荐奖励百分之二十五，同时赠送3等级 NFT<br />
                    4.直推满40个，推荐奖励百分之二十五，同时赠送2等级 NFT<br />
                    5.直推满50个，推荐奖励百分之二十五。同时赠送1等级 NFT<br />
                    备注：5等级 NFT可兑换原 价值五千人民币<br />
                    4等级 NFT可兑换原 价值一万人民币<br />
                    3等级 NFT可兑换原 价值两万人民币<br />
                    2等级 NFT可兑换原 价值四万人民币。<br />
                    1等级 NFT可兑换原 价值六万人民币。<br />
                    钻石由日本企业砖石矿提供。
                </div>

            </div>

        </div>

    )
}

const style = {
    bannar: {
        backgroundImage: `url(${bannar.src})`,
        backgroundSize: '100%,100%',
    },

    bannar2: {
        backgroundImage: `url(${purchase.src})`,
        backgroundSize: '100%,100%',
    },
    bannar3: {
        backgroundImage: `url(${btn.src})`,
        backgroundSize: '100%,100%',
    },
    bannar4: {
        backgroundImage: `url(${border.src})`,
        backgroundSize: '100%,100%',
    },
}
