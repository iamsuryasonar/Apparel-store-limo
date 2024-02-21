import {
  faArrowDown,
  faArrowUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import AddAddressForm from "../components/AddAddressForm";
import AddressServices from "../services/address.services";

function AccountPage() {
  const [menu, setMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const options = [
    {
      id: 1,
      title: "Order History",
      component: OrderHistory,
    },
    {
      id: 2,
      title: "View Addresses",
      component: Addresses,
    },
  ];

  const Component = options[activeMenu].component;

  return (
    <>
      <div className="max-w-7xl m-4 w-full">
        <div
          onClick={() => {
            setMenu(!menu);
          }}
          className="w-full py-2 p-4 bg-slate-200 flex flex-row justify-between cursor-pointer"
        >
          <p className="">My Account</p>
          {menu ? (
            <FontAwesomeIcon
              className="place-self-center hover:text-green-500"
              icon={faArrowUp}
            />
          ) : (
            <FontAwesomeIcon
              className="place-self-center hover:text-green-500"
              icon={faArrowDown}
            />
          )}
        </div>
        {menu && (
          <>
            {options.map((item, index) => {
              return (
                <p
                  onClick={() => {
                    setActiveMenu(index);
                    setMenu(false);
                  }}
                  key={item.id}
                  className="w-full py-2 p-4 hover:bg-slate-300 bg-slate-50 border cursor-pointer"
                >
                  {item.title}
                </p>
              );
            })}
            <p
              onClick={() => {}}
              className="w-full py-2 p-4 bg-slate-50 hover:bg-slate-300 border cursor-pointer"
            >
              Log out
            </p>
          </>
        )}
        {<Component />}
      </div>
    </>
  );
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
  return (
    <div className="my-4">
      <p className="text-5xl font-bold">Order History</p>
      <p>You haven't placed any orders yet.</p>

      {orderHistory.map((order) => {
        return (
          <div className="flex justify-between items-center bg-slate-50 p-2 shadow-xl">
            <div className="w-32 aspect-square bg-white">
              <img src={order.image}></img>
            </div>
            <div>
              <p>{order.name}</p>
              <p>{order.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Addresses() {
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editFormData, setEditFormData] = useState(null);

  const getAddresses = async () => {
    const response = await AddressServices.getAllAddresses();
    // console.log("Address log" + response);
    // response.forEach((address) => {
    //   console.log("Address:", address);
    //   console.log("ID:", address._id);
    //   console.log("Name:", address.name);
    // });
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
    <div className="my-4 flex flex-col md:flex-col">
      <div className="flex flex-col md:flex-row  justify-between md:items-center">
        <p className="text-5xl font-bold">Your Addresses</p>
        <button
          onClick={handleAddressAdd}
          className="bg-black text-white p-2 self-start m-2"
        >
          Add a new Address
        </button>
      </div>
      <div>
        {/* todo fetch list of addresses */}
        {addresses?.length === 0 ? (
          <div className="flex flex-col mt-20 justify-center items-center">
            <p>No Address Found</p>
          </div>
        ) : (
          addresses?.map((address) => {
            return (
              <div
                key={address._id}
                className="relative flex flex-row justify-between m-1 p-2 gap-2 shadow-xl bg-slate-100 rounded-md "
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
                 <button
                    onClick={() => {
                      handleAddressDelete(address);
                    }}
                    className="py-2 px-4 font-bold text-white border rounded-sm bg-black hover:bg-red-700 hover:text-white "
                  >
                    Remove
                  </button>
            
                 <button
                    onClick={() => handleAddressEdit(address)}
                    className="py-2 px-4 font-bold text-white border rounded-sm bg-black hover:bg-amber-600 hover:text-white "
                  >
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
        <AddAddressForm setAddressFormVisible={setAddressFormVisible} editMode={editMode} editFormData={editFormData}/>
      )}
    </div>
  );
}
