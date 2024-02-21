import { useState, useEffect } from "react";
import {
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignoutModal from '../../components/SignoutModal';
import AddressComponent from './components/AddressComponent';
import OrderHistoryComponent from './components/OrderHistoryComponent';

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
      component: OrderHistoryComponent,
    },
    {
      id: 2,
      title: "View Addresses",
      component: AddressComponent,
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





