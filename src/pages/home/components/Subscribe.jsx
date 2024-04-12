import subscribe from '../../../assets/subscribe.jpg';

function Subscribe() {
    return <section id="subscribe-section" className="w-full py-6 flex flex-col md:grid md:grid-cols-2">
        {/* <img alt='subscribe banner' className="object-cover h-[25rem]" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' /> */}
        <img alt='subscribe banner' className="object-cover h-[25rem]" src={subscribe} />
        <div className="w-full h-[25rem] bg-black none flex flex-col justify-center items-center gap-8">
            <p className="text-white text-4xl">GET ON OUR LIST</p>
            <div className="relative w-10/12 ">
                <input className='w-full h-10 border-2 rounded-md border-yellow-200 bg-transparent text-white' ></input>
                <p className="bg-white px-6 py-2 absolute top-0 bottom-0 right-0 rounded-md">SUBMIT</p>
            </div>
        </div>
    </section>
}
export default Subscribe;