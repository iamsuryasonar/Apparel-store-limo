import { useState, useEffect } from "react";
import AddressServices from "../../../services/address.services";
import AddressShimmer from '../../../components/shimmers/AddressShimmer';
import AddAddressForm from "../../../components/AddAddressForm";

function AddressComponent() {
    const [addressFormVisible, setAddressFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [addresses, setAddresses] = useState(null);
    const [editFormData, setEditFormData] = useState(null);

    const getAddresses = async () => {
        const response = await AddressServices.getAllAddresses();
        setAddresses(response);
    };

    useEffect(() => {
        getAddresses();
    }, []);

    const handleAddressDelete = async (addressToDelete) => {
        await AddressServices.removeAddress({
            id: addressToDelete?._id,
        });
        setAddresses(
            addresses.filter((address) => address._id !== addressToDelete._id)
        );
    };

    const handleAddressAdd = () => {
        setAddressFormVisible(true);
        setEditMode(false);
        setEditFormData(null);
    }

    const handleAddressEdit = (address) => {
        setAddressFormVisible(true);
        setEditMode(true)
        setEditFormData(address);
    }

    return (
        <div className="my-4 flex flex-col md:flex-col  gap-4">
            <div className="flex flex-col md:flex-row  justify-between md:items-center gap-2">
                <p className="text-5xl font-bold text-[#78B3CE]">Your Addresses</p>
                <button
                    onClick={handleAddressAdd}
                    className="py-1 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#78B3CE] transition-colors duration-300 bg-opacity-70 backdrop-blur-md self-start"
                >
                    Add a new Address
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {!addresses && <AddressShimmer />}
                {addresses && addresses?.length === 0 ? (
                    <div className="flex flex-col mt-20 justify-center items-center">
                        <p>No Address Found</p>
                    </div>
                ) : (
                    addresses?.map((address) => {
                        return (
                            <div
                                key={address._id}
                                className="flex flex-row justify-between rounded-md bg-slate-50 p-4 shadow-lg gap-4 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <p>
                                        <span className="text-xl font-semibold ">
                                            {address.name}
                                        </span>
                                    </p>
                                    <p>Phone : {address.contact_number}</p>
                                    <p>House no. {address.house_number}</p>
                                    <p>{address.landmark}</p>
                                    <p>{address.town}, {address.pin}</p>
                                    <p>{address.city}, {address.state}, {address.country}</p>
                                    <div className="flex gap-2 mt-2 mb-1">
                                        <button onClick={() => {
                                            handleAddressDelete(address);
                                        }} className="py-1 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#e74c4c] transition-colors duration-300 bg-opacity-70 backdrop-blur-md">
                                            Remove
                                        </button>

                                        <button onClick={() =>
                                            handleAddressEdit(address)
                                        } className="py-1 px-4 font-bold text-lg bg-[#78B3CE] border-[3px] border-[#78B3CE] hover:bg-white text-white hover:text-[#78B3CE] transition-colors duration-300 bg-opacity-70 backdrop-blur-md">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {addressFormVisible && (
                <AddAddressForm setAddressFormVisible={setAddressFormVisible} editMode={editMode} editFormData={editFormData} getAddresses={getAddresses} />
            )}
        </div>
    );
}


export default AddressComponent;