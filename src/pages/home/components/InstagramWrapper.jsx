function InstagramWrapper() {
    return <div className=" flex flex-col justify-center items-center p-6">
        <p className="text-3xl font-bold ">FOLLOW US ON INSTAGRAM</p>
        <div className="w-full md:w-11/12 lg:w-8/12 mt-10  grid grid-cols-1 sm:flex justify-center items-center gap-8">
            <div className="aspect-square">
                <img className="object-cover w-full h-full" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className="aspect-square">
                <img className="object-cover w-full h-full" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
        </div>
    </div>
}
export default InstagramWrapper;