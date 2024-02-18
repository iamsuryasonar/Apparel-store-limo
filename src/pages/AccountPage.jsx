import { faArrowDown, faArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddAddressForm from '../components/AddAddressForm'

function AccountPage() {

    const [menu, setMenu] = useState(false);
    const [activeMenu, setActiveMenu] = useState(0);

    const options = [
        {
            id: 1,
            title: 'Order History',
            component: OrderHistory,
        },
        {
            id: 2,
            title: 'View Addresses',
            component: Addresses,
        },
    ];

    const Component = options[activeMenu].component;

    return <>
        <div className="max-w-7xl m-4 w-full">
            <div onClick={() => { setMenu(!menu) }} className="w-full py-2 p-4 bg-slate-200 flex flex-row justify-between cursor-pointer">
                <p className="">My Account</p>
                {menu ? <FontAwesomeIcon className="place-self-center hover:text-green-500" icon={faArrowUp} />
                    :
                    <FontAwesomeIcon className="place-self-center hover:text-green-500" icon={faArrowDown} />
                }
            </div>
            {
                menu && <>
                    {options.map((item, index) => {
                        return <p
                            onClick={() => {
                                setActiveMenu(index)
                                setMenu(false)
                            }}
                            key={item.id} className="w-full py-2 p-4 hover:bg-slate-300 bg-slate-50 border cursor-pointer">{item.title}</p>
                    })}
                    <p onClick={() => { }} className="w-full py-2 p-4 bg-slate-50 hover:bg-slate-300 border cursor-pointer">Log out</p>
                </>
            }
            {
                <Component />
            }
        </div>
    </>
}

export default AccountPage;

function OrderHistory() {
    const orderHistory = [
        // {
        //     id: 1,
        //     name: 'Product name',
        //     price: 1200,
        //     image: '',
        // }
    ];
    return <div className="my-4">
        <p className="text-5xl font-bold">Order History</p>
        <p>You haven't placed any orders yet.</p>

        {
            orderHistory.map((order) => {
                return <div className="flex justify-between items-center bg-slate-50 p-2 shadow-xl">
                    <div className="w-32 aspect-square bg-white">
                        <img src={order.image}></img>
                    </div>
                    <div>
                        <p>{order.name}</p>
                        <p>{order.price}</p>
                    </div>
                </div>
            })
        }
    </div>
}

function Addresses() {
    const [addressFormVisible, setAddressFormVisible] = useState(false);

    return <div className="my-4 flex flex-col md:flex-col">
        <div className="flex flex-col md:flex-row  justify-between md:items-center">
            <p className="text-5xl font-bold">Your Addresses</p>
            <button onClick={() => setAddressFormVisible(!addressFormVisible)} className="bg-black text-white p-2 self-start m-2">Add a new Address</button>
        </div>
        <div>
            {/* todo fetch list of addresses */}
        </div>

        {
            addressFormVisible && <AddAddressForm setAddressFormVisible={setAddressFormVisible} />

        }
    </div>
}


