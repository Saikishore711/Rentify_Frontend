import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { classNamesMerge } from "../../utils/generalUtils";
import SideBar from "./SideBar";

// import SiteLogo from "../../assets/Logo.svg";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleInfo, FaHouse } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { loadUserData } from "../../redux/Action/action";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import useMobileView from "../../hooks/useMobileView";
import GLOBAL_CONSTANTS from "../../GlobalConstants";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobileView = useMobileView();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { userData } = useSelector((state) => state.data);

  // useEffect(() => {
  //   dispatch(loadUserData());
  // }, []); // eslint-disable-line

  const navigation = GLOBAL_CONSTANTS?.userType == "seller" ? [
    { key: "my_listings", icon: <FaHouse />, name: "My Listings", route: "/seller/my-listings" },
    { key: "about", icon: <FaCircleInfo />, name: "About", route: "/seller/about" },
  ] : [
    { key: "home", icon: <FaHouse />, name: "Home", route: "/buyer/home" },
    { key: "properties", icon: <FaHouse />, name: "Properties", route: "/buyer/properties" },
    { key: "about", icon: <FaCircleInfo />, name: "About", route: "/buyer/about" },
  ];

  const userNavigation = [
    // {
    //   key: "profile",
    //   icon: <MdAccountCircle />,
    //   name: "Your Profile",
    //   route: "/profile",
    // },
    // {
    //   key: "settings",
    //   icon: <IoMdSettings />,
    //   name: "Settings",
    //   route: "/settings",
    // },
    { key: "signout", icon: <FaSignOutAlt />, name: "Sign out" },
  ];

  const handleItemClick = (item) => {
    setMobileMenuOpen(false);

    if (item?.key == "signout") {
      localStorage?.clear();
      window.location.reload();
    } else {
      navigate(item?.route);
    }
  };

  const handleAddPropertyClick = () => {
    navigate("/seller/add-property");
  }

  return (
    //#520000
    <>
      <Disclosure as="nav" className="bg-gray-800 sticky top-0 w-full z-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  onClick={() => setMobileMenuOpen(true)}
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="flex flex-shrink-0 items-center">
                {/* <img
                  className="h-5 sm:h-7 w-auto cursor-pointer"
                  src={SiteLogo}
                  onClick={() => navigate("/")}
                /> */}

                <div className="text-white font-semibold text-lg">Rentify</div>
              </div>
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className={classNamesMerge(
                      location.pathname == item.route
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                    )}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 space-x-2 sm:space-x-5">
                <Button
                  variant="contained"
                  className="!rounded !normal-case !px-3 !py-1.5"
                  startIcon={<AddIcon />}
                  onClick={handleAddPropertyClick}
                >
                  {isMobileView ? "Property" : "Add Property"}
                </Button>
              </div>
              <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex items-center gap-3 rounded-md text-sm">
                      <AccountCircleOutlinedIcon className="!text-white"/>
                      <div className="text-base font-medium text-white">
                        {userData?.name}
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <div
                              className={classNamesMerge(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                              onClick={() => handleItemClick(item)}
                            >
                              {item.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Side NavBar for mobile view */}
        <SideBar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigation={navigation}
          userNavigation={userNavigation}
          handleItemClick={handleItemClick}
        />
      </Disclosure>
    </>
  );
}
