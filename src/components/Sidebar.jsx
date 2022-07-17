import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import LogoMamas from "../assets/mamasLogo.png"
import {
  MdSpaceDashboard,
  MdFoodBank,
  MdFastfood,
  MdDonutSmall,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { Avatar, Image } from 'antd';



const routes = [
  {
    path: "/admin/dashboard",
    name: "Home",
    icon: <MdSpaceDashboard />,
  },
  {
    path: "/admin/dashboard/items",
    name: "Items",
    icon: <MdFoodBank />,
  },
  {
    path: "/admin/dashboard/users",
    name: "Users",
    icon: <HiUsers />,
  },
  {
    path: "/admin/dashboard/categories",
    name: "Categories",
    icon: <MdFastfood />,
  },
  {
    path: "/admin/dashboard/plans",
    name: "Plans",
    icon: <MdDonutSmall />,
  },
];

const Sidebar = ({children}) => {
  const [isOpen,setIsOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
    .replace("admin/dashboard/", "")
    .replace("/", "");

  const toggleOpen = () => {
      setIsOpen((prev) => !prev);
    }
  return (
    <div className="h-screen flex ">
      <motion.div
        animate={{ width: isOpen ? "200px" : "50px" }}
        className="bg-gradient-to-r from-[#99353D] to-red-600 h-full "
      >
        <motion.div
          className={`py-1 ${isOpen && "grid place-items-center"}`}
          animate={{}}
        >
          <div onClick={toggleOpen}>
            <img src={LogoMamas} width={isOpen ? "110" : ""} className="z-10" />
          </div>
          {isOpen && (
            <h1 className="text-xl font-bold  text-amber-300">MamasKitchen</h1>
          )}
        </motion.div>
        <section className="text-white ">
          {routes.map((rt, i) => (
            <NavLink to={rt.path} key={i}>
              <Tooltip title={rt.name} key={i} placement="right" arrow>

              <div
                className={`flex  gap-5 my-5 px-2 hover:border-r-4 hover:w-[96%] hover:scale-110 hover:pl-3 ${
                  pathname == rt.name.toLocaleLowerCase()
                    ? "bg-red-300/25 scale-100 pl-3 w-[96%] py-1"
                    : ""
                }`}
              >
                <div>{rt.icon}</div>
                {isOpen && <div>{rt.name}</div>}
              </div>
              </Tooltip>
            </NavLink>
          ))}
        </section>
      </motion.div>

      <main className="w-full">
        <nav className="h-14 w-full bg-gradient-to-b from-[#99353D]/90 to-red-600/90 mb-3 flex justify-between items-center px-5">
          <div className="text-amber-300">
            {!isOpen && (
              <h1 className="text-xl font-bold  text-amber-300">
                MamasKitchen
              </h1>
            )}
          </div>
          <div>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
          </div>
        </nav>
        {children}
        <Outlet />
        
      </main>
    </div>
  );
};

export default Sidebar;
