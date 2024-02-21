import {
  faArrowDown,
  faArrowUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import AddAddressForm from "../components/AddAddressForm";
import AddressServices from "../services/address.services";
import OrderServices from "../services/order.services";
import { useNavigate } from "react-router-dom";
import SignoutModal from '../components/SignoutModal';

function AccountPage() {
  const [menu, setMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const [isLogoutModal, setIsLogoutModal] = useState(false);

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
              onClick={() => setIsLogoutModal(true)}
              className="w-full py-2 p-4 bg-slate-50 hover:bg-slate-300 border cursor-pointer"
            >
              Log out
            </p>
            {isLogoutModal &&
              <SignoutModal isLogoutModal={isLogoutModal} setIsLogoutModal={setIsLogoutModal} />
            }
          </>
        )}
        {<Component />}
      </div>
    </>
  );
}

export default AccountPage;

function OrderHistory() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const results = await OrderServices.getAllOrders();
    setOrders(results);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div className="my-4">
      <p className="text-5xl font-bold">Order History</p>
      {orders?.length < 1 && <p>You haven't placed any orders yet.</p>}

      <div className="flex flex-col gap-4">
        {orders?.map((order) => {
          return (
            <div key={order._id} className="flex items-start bg-slate-50 p-4 shadow-lg gap-4 cursor-pointer"
              onClick={() => {
                navigate(`/product/${order?.item.product._id}`, {
                  state: { colorVariantId: order?.item?.colorvariant?._id, sizeVariantId: order?.item?.sizevariant?._id, productId: order?.item.product._id }
                })
              }}
            >
              <div className="w-52  bg-white">
                <img className='aspect-square object-cover' src={order.item.colorvariant.images[0].url}></img>
              </div>
              <div className="">
                <p className="text-xl font-medium">{order.item.product.name}</p>
                <div className="flex flex-row justify-between">
                  <p>size: {order.item.sizevariant.name}</p>
                  <p>QTY: {order.item.quantity}</p>
                </div>
                <p>₹ {order.lockedprice}</p>
                <p>Address Info</p>
                <span>{order.name}, </span>
                <span>{order.contact_number}, </span>
                <span>{order.house_number}, </span>
                <span>{order.city}, </span>
                <span>{order.pin}, </span>
                <span>{order.state} ...</span>
                <p className="bg-green-500 px-2 py-1 text-white">{order.status}</p>
              </div>
            </div>
          );
        })}
      </div>
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
    <div className="my-4 flex flex-col md:flex-col  gap-4">
      <div className="flex flex-col md:flex-row  justify-between md:items-center gap-2">
        <p className="text-5xl font-bold">Your Addresses</p>
        <button
          onClick={handleAddressAdd}
          className="bg-black text-white p-2 self-start"
        >
          Add a new Address
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {addresses?.length === 0 ? (
          <div className="flex flex-col mt-20 justify-center items-center">
            <p>No Address Found</p>
          </div>
        ) : (
          addresses?.map((address) => {
            return (
              <div
                key={address._id}
                className="relative flex flex-row justify-between p-2  shadow-lg bg-slate-100 rounded-md"
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
        <AddAddressForm setAddressFormVisible={setAddressFormVisible} editMode={editMode} editFormData={editFormData} />
      )}
    </div>
  );
}
