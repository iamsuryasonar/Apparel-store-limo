import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SERVICES } from '../utilities/constants';

function ServicesSection() {
    return <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-start">
        {
            SERVICES.map((item) => {
                return <div className="flex flex-row gap-6 items-center">
                    <FontAwesomeIcon className="text-xl " icon={item.icon} />
                    <div className="flex flex-col">
                        <p className="font-semibold">{item.title}</p>
                        <p>{item.description}</p>
                    </div>
                </div>
            })
        }
    </section>
}

export default ServicesSection
