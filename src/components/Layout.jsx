import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRange, DateRangePicker  } from "react-date-range";
import { addDays, format } from "date-fns";
import "./daterange.css";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/auth/authSlice";
import { useGetItemsQuery } from "../redux/slices/items/itemsApiSlice";
import * as lodesh from "lodash";
import { useGetAllPlansQuery } from "../redux/slices/items/getPlans";
import { Radio } from "antd";
import { setFoodType } from "../redux/slices/items/itemSlice";

const Layout = ({ children }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();

  // console.log(range);

  // const [open, setOpen] = useState(false)
  const refOne = useRef(null);

  const { data: PlansDt, isSuccess } = useGetAllPlansQuery();

  if (isSuccess) {
    var foodType = PlansDt;
  }

  return (
    <div className=" relative h-screen">
      <div className="py-6 sticky top-0 z-10 bg-[#99353D] flex justify-around items-center">
        {/* <span className="bg-white text-red-800 rounded-2xl w-20 py-1 text-center font-semibold">
            Breakfast
          </span> */}
        <Radio.Group defaultValue="a" buttonStyle="solid">
          {foodType?.map((it) => (
            <Radio.Button
              style={{
                // backgroundColor: "red",
                // color:"white"
              }}
              value={it.name}
              onClick={() => {
                dispatch(setFoodType(it))
                
              }}
            >
              {it.name}
            </Radio.Button>
          ))}
        </Radio.Group>
        <span>
          <div ref={refOne}></div>
        </span>
        <span
          onClick={() => {
            // dispatch(logOut())
          }}
        >
          <MdOutlineMenu
            className="text-white font-thin text-4xl"
            fontSize="medium"
          />
        </span>
      </div>
      <div>{children}
      
      </div>
      {/* <Outlet /> */}

      <div className="fixed bottom-0 z-1000 w-full py-6 bg-[#99353D] self-end text-white flex justify-around items-center">
        <span>Total</span>
        <span className="rounded-2xl border border-white text-center w-28 py-1">
          0 AED
        </span>
        <span className="text-2xl">></span>
      </div>
    </div>
  );
};

export default Layout;
