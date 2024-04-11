import useOnScreen from '../../../hooks/useOnScreen'

function InstagramWrapper() {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    return <section ref={ref} className={`flex flex-col justify-center items-center p-6 transition-all duration-700 ${isVisible ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        <p className="font-light text-4xl">FOLLOW US ON INSTAGRAM</p>
        <div className="w-full md:w-11/12 lg:w-8/12 mt-10  grid grid-cols-1 sm:flex justify-center items-center gap-8">
            <div className="aspect-square">
                <img alt='instagram' className="object-cover w-full h-full" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
            <div className="aspect-square">
                <img alt='instagram' className="object-cover w-full h-full" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </div>
        </div>
    </section>
}
export default InstagramWrapper;