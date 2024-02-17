import { faArrowDown, faArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { STATES } from "../constants/constant";
import AddressServices from '../services/address.services'

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
    const [isFormVisible, setFormVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        contact_number: '',
        house_number: '',
        town: '',
        city: '',
        landmark: '',
        pin: '',
        state: '',
        country: 'India',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const addAddressHandler = () => {
        AddressServices.addAddress(formData);
    }

    return <div className="my-4 flex flex-col md:flex-col">
        {console.log(formData)}
        <div className="flex flex-col md:flex-row  justify-between md:items-center">
            <p className="text-5xl font-bold">Your Addresses</p>
            <button onClick={() => setFormVisible(!isFormVisible)} className="bg-black text-white p-2 self-start m-2">Add a new Address</button>
        </div>

        <div>
            {/* todo fetch list of addresses */}
        </div>

        {
            isFormVisible &&
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-white m-4 flex flex-col items-center">
                <div className="max-w-xl w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="my-4 text-3xl font-bold ">ADD A NEW ADDRESS</p>
                        <FontAwesomeIcon onClick={() => setFormVisible(false)} className="text-4xl cursor-pointer hover:text-green-500" icon={faXmark} />
                    </div>
                    <form className="w-full flex flex-col gap-4 font-light ">
                        <input
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="Full name"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <input
                            value={formData.contact_number}
                            onChange={handleChange}
                            name="contact_number"
                            type="number"
                            placeholder="Phone number"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <input
                            value={formData.house_number}
                            onChange={handleChange}
                            name="house_number"
                            type="number"
                            placeholder="House Number"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <input
                            value={formData.town}
                            onChange={handleChange}
                            name="town"
                            type="text"
                            placeholder="Town"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <input
                            value={formData.city}
                            onChange={handleChange}
                            name="city"
                            type="text"
                            placeholder="City"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <input
                            value={formData.landmark}
                            onChange={handleChange}
                            name="landmark"
                            type="text"
                            placeholder="Landmark"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <input
                            value={formData.pin}
                            onChange={handleChange}
                            name="pin"
                            type="number"
                            placeholder="Pin code"
                            className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "
                        ></input>
                        <select
                            value={formData.state}
                            onChange={handleChange}
                            name="state"
                            defaultValue="Select state..."
                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option selected value=''>
                                Select state...
                            </option>

                            {STATES.map((name) => {
                                return (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            value={formData.country}
                            onChange={handleChange}
                            name="country"
                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="India">India</option>
                        </select>
                    </form>
                    <button onClick={() => {
                        addAddressHandler();
                        setFormVisible(false)
                    }} className="bg-black text-white py-2 px-6 self-end">Add</button>
                </div>

            </div>
        }
    </div>
}
