import { useEffect, useState,useRef } from "react";
import { Outlet } from "react-router-dom";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRange, DateRangePicker  } from "react-date-range";
// import { addDays, format } from "date-fns";
import './daterange.css'
import {MdOutlineMenu} from 'react-icons/md'


const Layout = ({ children }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
  }
  ])

  console.log(range);
  
  // const [open, setOpen] = useState(false)
  // const refOne = useRef(null)
  // useEffect(() => {
  //   document.addEventListener('keydown',hidOnEscape,true)
  //   document.addEventListener('click',hidOnClickOutside,true)
  // },[])

  // const hidOnEscape = (e) => {
  //   console.log(e);
  //   if (e.key === 'Escape') {
  //     setOpen(false)
  //   }
  // }
  // const hidOnClickOutside = (e) => {
  //   if (refOne.current && !refOne.current.contains(e.target)) {
  //     setOpen(false);
  //   }
  // };


  return (
    <div className=" relative h-screen">
      <div className="py-6 sticky top-0 z-10 bg-[#99353D] flex justify-around items-center">
        <span className="bg-white text-red-800 rounded-2xl w-20 py-1 text-center font-semibold">
          Dinner
        </span>
        <span>
          {/* <input
            type="text"
            value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
              range[0].endDate,
              "MM/dd/yyyy"
            )}`}
            readOnly
            onClick={() => setOpen((open) => !open)}
            className="bg-[#99353D] border rounded-md p-1  text-white text-sm text-center"
          /> */}
          <div ref={refOne}>
            {/* {open && (
              <DateRange
                onChange={(item) => setRange([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
                fixedHeight={true}
                className="absolute "
              />
            )} */}
          </div>
        </span>
        <span>
          <MdOutlineMenu className="text-white font-thin" fontSize="medium" />
        </span>
      </div>
      <div>{children}</div>
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
