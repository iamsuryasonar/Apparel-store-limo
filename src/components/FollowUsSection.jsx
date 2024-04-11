import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FollowUsSection() {
    return <section className="w-10/12 grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-start">
        <div className='flex flex-col gap-2'>
            <p className="font-bold">Follow Us</p>
            <div className="flex flex-row gap-2">
                <div className="group w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <FontAwesomeIcon className="text-xl group-hover:text-blue-700" icon="fab fa-linkedin" />
                </div>
                <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <FontAwesomeIcon className="text-xl group-hover:text-red-500" icon="fab fa-instagram" />
                </div>
                <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <FontAwesomeIcon className="text-xl group-hover:text-blue-600" icon="fab fa-facebook" />
                    {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                </div>
                <div className="group w-9 h-9  rounded-full bg-slate-200 hover:bg-slate-100 grid place-items-center ">
                    <FontAwesomeIcon className="text-xl group-hover:text-red-500" icon="fab fa-youtube" />
                </div>
            </div>
        </div>
    </section>
}

export default FollowUsSection