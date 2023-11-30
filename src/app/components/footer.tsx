

const Footer = () => {
    return (
        <>
            <div className="bg-[#282828]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 gap-4 py-10 border-b-2 border-b-gray-600">
                        <div className="col-span-2 border-gray-600 border-2 rounded-sm flex justify-around">
                            <div className="my-8 flex justify-between items-center gap-5 md:gap-10">
                                <div className="w-8 h-8">
                                    <img src="/socials/hotline.png" alt="hotline" />
                                </div>
                                <div>
                                    <p className="text-white inline">Hotline: </p>{' '}
                                    <span className="text-rose-600 inline">0966.103.320</span>
                                    <p className="text-white">Vũ Đình Linh</p>
                                </div>
                            </div>
                            <div className="my-8 pl-4 border-l-gray-600 border-l-2">
                                <p className="text-white">Thời gian làm việc: </p>
                                <p className="text-white"><span className="text-yellow-600">GIAO DỊCH UY TÍN 24/24</span>{' '} các ngày trong tuần</p>
                            </div>
                        </div>
                        <div className="text-white">
                            <div className="grid grid-cols-2 mt-4">
                                <p>Acc đã bán ra:</p> <p className="text-rose-600">36.584</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Tổng số thành viên: </p> <p className="text-rose-600">170.422</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Đang online: </p> <p className="text-rose-600">1</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Số lần truy cập: </p> <p className="text-rose-600">18.936.412</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-white inline'>Liên kết chia sẻ: </p>
                            <div className='inline-flex gap-2 mt-3 ml-3'>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-black hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/tiktok.png" alt="tiktok" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#2478ba] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/twitter.png" alt="twitter" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#0072b7] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/linkedin.png" alt="linkedin" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#c33223] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/youtube.png" alt="youtube" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#9146fe] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/twitch.png" alt="twitch" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto py-6 text-white text-center">
                        <p>Địa chỉ: Định Công, Hoàng Mai, Hà Nội</p>
                        <p>© 2023, Copyright by Shop Acc Đình Linh Giá Rẻ - Uy Tín.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer