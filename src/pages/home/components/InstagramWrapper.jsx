import instagramImage1 from '../../../assets/instagram1.jpg'
import instagramImage2 from '../../../assets/instagram2.jpg'
import useOnScreen from '../../../hooks/useOnScreen'

function InstagramWrapper() {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });

    const INSTAGRAM_IMAGES = [
        {
            id: 1,
            alt: 'instagram image 1',
            src: instagramImage1,
        },
        {
            id: 2,
            alt: 'instagram image 2',
            src: instagramImage2,
        },
    ]

    return <section ref={ref} className={`flex flex-col gap-4 mt-8 sm:justify-center sm:items-center px-2 transition-all duration-700 ${isVisible ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[100px]'}`}>
        <p className="font-bold text-4xl text-[#78B3CE]">FOLLOW US ON INSTAGRAM</p>
        <div className="w-full md:w-11/12 lg:w-8/12 grid grid-cols-1 sm:flex justify-center items-center gap-8">
            {
                INSTAGRAM_IMAGES.map((item) => {
                    return <div key={item.id} className="aspect-square">
                        <img alt={item.alt} src={item.src} className="object-cover w-full h-full" />
                    </div>
                })
            }
        </div>
    </section>
}

export default InstagramWrapper;