import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AddressServices from '../services/address.services'
import { STATES } from "../constants/constant";

function AddAddressForm({ setAddressFormVisible, editMode, editFormData }) {
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

    useEffect(() => {
        if(editMode && editFormData) {
            setFormData(editFormData);
        }
    },[editMode, editFormData])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddresSubmit = async () => {
        if(editMode && editFormData){
            await AddressServices.updateAddress(formData);
        }else {

            await AddressServices.addAddress(formData);
        }
        setAddressFormVisible(false);   
    }

    return <div className="z-10 fixed top-20 bottom-0 right-0 left-0 bg-white p-4 flex flex-col items-center overflow-scroll">
        <div className="max-w-xl w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="my-4 text-3xl font-bold ">{editMode ? 'UPDATE ADDRESS' : 'ADD A NEW ADDRESS'}</p>
                <FontAwesomeIcon onClick={() => setAddressFormVisible(false)} className="text-4xl cursor-pointer hover:text-green-500" icon={faXmark} />
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
            <button onClick={handleAddresSubmit} className="bg-black text-white py-2 px-6 self-end">{editMode ? 'Save' : 'Add'}</button>
        </div>

    </div>
}


export default AddAddressForm;