import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenModal } from "../redux/slices/modalSlice";
import "./foodlist.css";
import DialogModal from "./DialogModal";
import APIClient from "../utils/axios";
import { API_URL } from "../utils/urls";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import * as lodesh from "lodash"
// import {
//   selectAllItems,
//   // getItemsState,
//   // getItemsError,
//   // fetchItems,
//   storeItems
// } from "../redux/slices/items/itemSlice";
import { useGetItemsQuery } from "../redux/slices/items/itemsApiSlice";
import Loader from "./loadings/Loader";
// const cards_data = [
//   {
//     day: "SUNDAY",
//     categories: [
//       {
//         name: "Hot Plater",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Cool Plater",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Egg Dish",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Foul",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Labneh",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Bread",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Salad",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//       {
//         name: "Sweets",
//         items: [
//           {
//             name: "Arabic Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: " Falafel Platter",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//           {
//             name: "Fatteh With ghee",
//             image:
//               "https://imgs.search.brave.com/aSp62pM_uBjeZQPI1zioNRG7KeqsJ96zRwVCI4nhNiM/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/SlJra3c5ZVFucHdv/VTlUaVpYUGlBSGFK/NCZwaWQ9QXBp",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     day: "MONDAY",
//     categories: [
//       { name: "Hot Plater" },
//       { name: "Cool Plater" },
//       { name: "Egg Dish" },
//       { name: "Foul" },
//       { name: "Labneh" },
//       { name: "Bread" },
//       { name: "Salad" },
//       { name: "Sweets" },
//     ],
//   },
//   {
//     day: "TUESDAY",
//     categories: [
//       { name: "Hot Plater" },
//       { name: "Cool Plater" },
//       { name: "Egg Dish" },
//       { name: "Foul" },
//       { name: "Labneh" },
//       { name: "Bread" },
//       { name: "Salad" },
//       { name: "Sweets" },
//     ],
//   },
//   {
//     day: "WEDNESDAY",
//     categories: [
//       { name: "Hot Plater" },
//       { name: "Cool Plater" },
//       { name: "Egg Dish" },
//       { name: "Foul" },
//       { name: "Labneh" },
//       { name: "Bread" },
//       { name: "Salad" },
//       { name: "Sweets" },
//     ],
//   },
//   {
//     day: "THURSDAY",
//     categories: [
//       { name: "Hot Plater" },
//       { name: "Cool Plater" },
//       { name: "Egg Dish" },
//       { name: "Foul" },
//       { name: "Labneh" },
//       { name: "Bread" },
//       { name: "Salad" },
//       { name: "Sweets" },
//     ],
//   },
//   {
//     day: "FRIDAY",
//     categories: [
//       { name: "Hot Plater" },
//       { name: "Cool Plater" },
//       { name: "Egg Dish" },
//       { name: "Foul" },
//       { name: "Labneh" },
//       { name: "Bread" },
//       { name: "Salad" },
//       { name: "Sweets" },
//     ],
//   },
//   {
//     day: "SATURDAY",
//     categories: [
//       { name: "Hot Plater" },
//       { name: "Cool Plater" },
//       { name: "Egg Dish" },
//       { name: "Foul" },
//       { name: "Labneh" },
//       { name: "Bread" },
//       { name: "Salad" },
//       { name: "Sweets" },
//     ],
//   },
// ];

// const cards_data = []

const FoodList = () => {
  const dispatch = useDispatch();
  // const itemData = useSelector(selectAllItems);
  // const itemsStatus = useSelector(getItemsState);
  // const itemsError = useSelector(getItemsError);
  // const itemsdt = useSelector(selectAllItems)
  // const [itemData, setItemData] = useState([]);

  const APIClientPrivate = useAxiosPrivate();
  // const { auth } = useAuth();

  // useEffect(() => {
  //   if (itemsStatus === "idle") {
  //     dispatch(fetchItems());
  //   }
  // }, [itemsStatus, dispatch]);
  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController()
  //   const getitems = async () => {
  //     try {
  //       const res = await APIClientPrivate.get("/day", {
  //         signal: controller.signal,
  //       });

  //       isMounted && setItemData(res.data)
  //       dispatch(storeItems(res.data));
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getitems()

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   }
  // }, [])
  const {data:itemData,isLoading,isSuccess,isError,error } = useGetItemsQuery()

  // console.log(lodesh.flatten(itemsdt));
  console.log(itemData);
  //  const [open, setOpen] = React.useState(false);
  //  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState({
    state: false,
    items: [],
  });

  const onProceed = () => {
    console.log("Proceed clicked");
  };

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div className="grid place-items-center pt-10 pb-28 ">
        {lodesh.flatten(itemData)?.map((card, index) => (
          <div
            key={index}
            className="relative my-2 card-custom bg-white max-w-[80%] min-w-[70%] rounded-xl shadow-xl grid place-items-center h-auto "
          >
            <span className="text-white text-sm font-bold absolute left-[5px] top-[22px]">
              {card.day}
            </span>

            {/* <div className="bg-[#99353D] absolute top-14 right-10 rounded-2xl text-white text-sm w-40 text-center"> */}
            <select className="bg-[#99353D] absolute top-14 p-1 right-10 rounded-2xl text-white text-sm w-40 text-center">
              <option defaultValue="select">Select Delivery</option>
              <option
                value="home"
                className="bg-[#f8f7f7] text-[#504d4d] hover:bg-[#dad9d9]"
              >
                Home
              </option>
              <option value="office" className="bg-[#f8f7f7] text-[#504d4d] ">
                office
              </option>
            </select>
            {/* </div> */}

            <div className="grid place-items-center pt-28 pb-5 w-full">
              {card.categories?.map((cat, index) => (
                <span
                  key={index}
                  onClick={() =>
                    setIsOpened((prev) => ({
                      ...prev,
                      state: true,
                      items: cat.category.items,
                    }))
                  }
                  className="text-center rounded-3xl px-5 py-3 border bg-white shadow-xl my-2 w-[80%] text-sm"
                >
                  {cat.category.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        <DialogModal
          // title="Dialog modal example"
          isOpened={isOpened.state}
          items={isOpened.items}
          onProceed={onProceed}
          onClose={() =>
            setIsOpened((prev) => ({
              ...prev,
              state: false,
            }))
          }
        />
      </div>
    );
  } else if(isError) {
    content = <p>{ JSON.stringify(error)}</p>
  }

  return content
};

export default FoodList;
