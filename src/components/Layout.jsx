import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRange, DateRangePicker  } from "react-date-range";
import { addDays, format } from "date-fns";
import "./daterange.css";
import { MdOutlineMenu, MdPerson, MdKeyboardArrowRight } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/slices/auth/authSlice";
import { useGetItemsQuery } from "../redux/slices/items/itemsApiSlice";
import * as lodesh from "lodash";
import { useGetAllPlansQuery } from "../redux/slices/items/getPlans";
import { Image, message, Radio } from "antd";
import { setFoodType } from "../redux/slices/items/itemSlice";
import mmaLogo from "../assets/mamasLogo.png";
import { currentTotal } from "../redux/slices/cart/cartSlice";
import { formatCurrency } from "../utils/formatCurrency";

const Layout = ({ children }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Total = useSelector(currentTotal);
  function handlePayment() {
    if (Total > 1) {
    navigate("payment");
    } else {
      message.warning("There is Nothing in the cart!")
    }
}
  // console.log(range);

  // const [open, setOpen] = useState(false)
  const refOne = useRef(null);

  return (
    <div className=" relative h-screen font-nunito">
      <div className="py-2 sticky top-0 z-10 bg-[#99353D] flex justify-between px-5 items-center">
        {/* <span className="bg-white text-red-800 rounded-2xl w-20 py-1 text-center font-semibold">
            Breakfast
          </span> */}

        <span className="flex justify-between gap-1">
          <div
            ref={refOne}
            className="shadow-xl border-1 border-red-300 rounded-full w-14 h-14 grid place-items-center
          "
          >
            <Image src={mmaLogo} width="50px" preview={false} />
          </div>
          <h1 className="text-amber-200 text-xl font-nunito self-end">
            Mamas Kitchen
          </h1>
        </span>
        <span
          onClick={() => {
            // dispatch(logOut())
            navigate("profile");
          }}
        >
          <MdPerson
            className="text-white font-thin text-4xl"
            fontSize="medium"
          />
          {/* <UserOutlined
            className="text-white font-thin text-4xl"
            fontSize="medium"
          /> */}
        </span>
      </div>
      <div>{children}</div>
      {/* <Outlet /> */}

      <div className="fixed bottom-0 z-1000 w-full py-6 bg-[#99353D] self-end text-white flex justify-around items-center">
        <span>Total</span>
        <span className="rounded-2xl border border-white text-center w-28 py-1">
          {formatCurrency(Total)}
        </span>
        {/* <Link to="payment"> */}
        <span
          className="text-white flex items-center gap-1"
          onClick={handlePayment}
        >
          pay now
          <MdKeyboardArrowRight className="text-white text-3xl" />
        </span>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Layout;
