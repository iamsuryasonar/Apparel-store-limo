import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCreditCard, faRankingStar, faTruckFast } from "@fortawesome/free-solid-svg-icons";

function ServicesSection() {
    return <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-start">
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faRankingStar} />
            <div className="flex flex-col">
                <p className="font-semibold">Quatity</p>
                <p>100% Original quality guaranteed</p>
            </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faCartShopping} />
            <div className="flex flex-col">
                <p className="font-semibold">7 Days Replacement</p>
                <p>On all orders*</p>
            </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faCreditCard} />
            <div className="flex flex-col">
                <p className="font-semibold">Secure Payments</p>
                <p>Visa, Mastercard, EMI, Net Banking, UPI, BHIM, Wallet's </p>
            </div>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon className="text-xl " icon={faTruckFast} />
            <div className="flex flex-col">
                <p className="font-semibold">Fast & Free Shipping</p>
                <p>Ships in 24 Hours*</p>
            </div>
        </div>
    </section>
}

export default ServicesSection
