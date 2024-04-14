import instagramSvg from '../assets/social_media_icons/instagram.svg'
import youtubeSvg from '../assets/social_media_icons/youtube.svg'
import facebookSvg from '../assets/social_media_icons/facebook.svg'

function FollowUsSection() {
    return <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-start">
        <div className='flex flex-col gap-2'>
            <p className="font-bold">Follow Us</p>
            <div className="flex flex-row gap-2">
                <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <img className="text-xl group-hover:text-red-500 w-6 h-6" src={instagramSvg} />
                </div>
                <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <img className="text-xl group-hover:text-blue-600 w-6 h-6" src={facebookSvg} />
                </div>
                <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <img className="text-xl group-hover:text-red-500 w-6 h-6" src={youtubeSvg} />
                </div>
            </div>
        </div>
    </section>
}

export default FollowUsSection