import React from "react";
import { useState } from "react";
import MamasLogo from "../../assets/mamasLogo.png"
// import "./auth.css";
import { motion, AnimatePresence } from "framer-motion"
import Login from "../../components/Login"
import Register from "../../components/Register";



const authComponentData = [
  {
    label: "Sign In",
    component:  <Login />,
  },
  {
    label: "Sign Up",
    component:  <Register />,
  },
];

const [LoginTab, RegisterTab] = authComponentData;

const tabs = [LoginTab, RegisterTab];

const AuthPage = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  return (
    <div className=" h-screen">
      <div className="bg-[#99353D] h-[30%] grid place-items-center rounded-b-xl">
        <div>
          <img src={MamasLogo} alt="Mamas Logo" />
        </div>
        <nav className="w-full self-end text-white px-8 text-lg font-medium">
          <ul className="flex justify-around ">
            {tabs.map((item, index) => (
              <li
                key={index}
                className={
                  item === selectedTab
                    ? "border-b-2 border-amber-300 w-1/2 text-center"
                    : "text-center w-1/2"
                }
                onClick={() => setSelectedTab(item)}
              >
                {item.label}
                {item === selectedTab ? (
                  <motion.div className="underline" layoutId="underline" />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-[#FBF6F6] h-[70%]">
        <main>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedTab ? selectedTab : "empty"}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 10 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedTab ? selectedTab.component : "😋"}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AuthPage;
