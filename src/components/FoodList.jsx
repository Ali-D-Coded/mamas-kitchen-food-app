import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenModal } from "../redux/slices/modalSlice";
import "./foodlist.css";
import DialogModal from "./DialogModal";
import APIClient from "../utils/axios";
import { API_URL, fromImageToUrl } from "../utils/urls";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import * as lodesh from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircleOutlined } from "@ant-design/icons";
// import {
//   selectAllItems,
//   // getItemsState,
//   // getItemsError,
//   // fetchItems,
//   storeItems
// } from "../redux/slices/items/itemSlice";
import { useGetItemsQuery } from "../redux/slices/items/itemsApiSlice";
import Loader from "./loadings/Loader";
import {
  selectCurrentFoodType,
  setFoodType,
} from "../redux/slices/items/itemSlice";
import {
  Checkbox,
  Image,
  Radio,
  Button,
  Col,
  Row,
  Divider,
  Tag,
  Select,
  Collapse,
} from "antd";
import { increaseCartQuantity } from "../redux/slices/cart/cartSlice";
import { useGetAllPlansQuery } from "../redux/slices/items/getPlans";
import { useGetCategoriesQuery } from "../redux/slices/items/categoriesApiSlice";
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
  const selectedFoodType = useSelector(selectCurrentFoodType);
  const [itemData, setItemData] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedItems, setSelectedItems] = useState()
  const [selectedDays,setSelectedDays] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState()
  
  const [daysData, setDaysData] = useState([
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]);




  // console.log("selectedFoodType: ", selectedFoodType);
  const [refresh, setRefresh] = useState(false);


  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery(selectedFoodType?.name);

  const { data: categoryData, isSuccess: catgorySucess } =
    useGetCategoriesQuery();

  useEffect(() => {
    setRefresh((prev) => !prev);
    setItemData(items);
  }, [selectedFoodType]);

  // console.log("daysData", daysData.filter(it => {
  //   return !selectedDays.includes(it) && it
  // }),selectedDays);

  useEffect(() => {
    setDaysData((prev) =>
      prev.filter((it) => !selectedDays.includes(it) && it)
    );
    if (selectedDays.length < 1) {
       setDaysData((prev) =>
         prev.filter((it) =>  it)
       );
    }
  }, [selectedDays]);

  console.log("itemData :",isSuccess && items?.map(it => it.items));

  const onProceed = () => {
    console.log("Proceed clicked");
  };
  const onChange = (checkedValues) => {
    console.log("categoroes = ", checkedValues);
    setSelectedCategories(checkedValues);
    setItemData((prev) => {
      console.log(prev);
    });
  };
  const onChangeDay = (value) => {
    console.log(`selected ${value}`);
    setSelectedDays(value);
  };
  const onSearchDay = (value) => {
    console.log("search:", value);
  };
  const onChangeDelivery = (value) => {
    console.log(`selected ${value}`);
    setSelectedDelivery(value)
  };
  const onSearchDelivery = (value) => {
    console.log("search:", value);
  };
  const { data: PlansDt, isSuccess: plansSucces } = useGetAllPlansQuery();

  // const daysData = [
  //   "SUNDAY",
  //   "MONDAY",
  //   "TUESDAY",
  //   "WEDNESDAY",
  //   "THURSDAY",
  //   "FRIDAY",
  //   "SATURDAY",
  // ];
  const deliveryData = ["WORK", "HOME", "OTHER"];

  // if (plansSucces) {
  //   var foodType = PlansDt;
  // }
  function addItemtoCart(values) {

setSelectedItems(values)
    console.log({
      selectedItems,
      selectedFoodType: selectedFoodType.name,
      selectedCategories,
      selectedDays,
      selectedDelivery,
    });
  }

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div className="grid place-items-center pt-10 pb-28 ">
        <div className="sticky top-1 z-50 grid h-auto mb-4">
          <FoodtypeComponent foodType={PlansDt} />
        </div>
        {/* <div className="sticky top-11 z-50">
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={onChange}
          >
            <Row className="flex justify-center">
              {catgorySucess &&
                categoryData?.map((cat) => (
                  <Checkbox value={cat.id} key={cat.id} className="shadow-lg">
                    <Tag color="orange">{cat.name}</Tag>
                  </Checkbox>
                ))}
            </Row>
          </Checkbox.Group>
        </div> */}
        <Divider />
        {/* {isSuccess && lodesh.flatten(itemData)?.map((card, index) => (
          
          <div
            key={index}
            className="relative my-2 bg-white max-w-[80%] min-w-[85%] rounded-xl shadow-xl grid place-items-center h-auto "
          >
            <div className="flex w-full py-3 px-3 gap-2 items-center">
              <div className="">
                {/* <Image
                  src={`${fromImageToUrl(card?.images[0], "/items/images/")}`}
                /> *
              </div>
              <div className=" grid place-items-center flex-grow leading-[1px] text-center">
                <p className="text-lg font-bold font-nunito">{card.name}</p>
                <p className="text-md font-nunito">{card.description}</p>

                <div className="grid gap-2">
                  <div>
                    <Select
                      showSearch
                      placeholder="Select Days"
                      optionFilterProp="children"
                      mode="multiple"
                      onChange={onChangeDay}
                      onSearch={onSearchDay}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{
                        width: "200px",
                      }}
                    >
                      {daysData.map((it) => (
                        <Option value={it}>{it}</Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Select
                      showSearch
                      placeholder="Select Delivery"
                      optionFilterProp="children"
                      onChange={onChangeDelivery}
                      onSearch={onSearchDelivery}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{
                        width: "200px",
                      }}
                    >
                      {deliveryData.map((it) => (
                        <Option value={it}>{it}</Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        ))} */}

        {isSuccess && lodesh.flatten(itemData).map(cat => {
          return (
            <Collapse className="w-[90%]" >
              
              <Collapse.Panel header={cat.name} extra={<div className="">Hi</div>} >
                {
                  cat.items.map(it=>{
                    return (
                      <div
                        className="w-full bg-white shadow-md rounded-sm px-2 py-2"
                        onClick={() => console.log(it)}
                      >
                        {it.name}
                        <div className="grid gap-2">
                          <div>
                            <Select
                              showSearch
                              placeholder="Select Days"
                              optionFilterProp="children"
                              mode="multiple"
                              onChange={onChangeDay}
                              onSearch={onSearchDay}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              style={{
                                width: "200px",
                              }}
                            >
                              {daysData.map((it) => (
                                <Option value={it}>{it}</Option>
                              ))}
                            </Select>
                          </div>
                          <div>
                            <Select
                              showSearch
                              placeholder="Select Delivery"
                              optionFilterProp="children"
                              onChange={onChangeDelivery}
                              onSearch={onSearchDelivery}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              style={{
                                width: "200px",
                              }}
                            >
                              {deliveryData.map((it) => (
                                <Option value={it}>{it}</Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </Collapse.Panel>
            </Collapse>
          )
        })}

        {/* <DialogModal
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
        /> */}
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default FoodList;

function FoodtypeComponent({ foodType }) {
  const [selectedType, setSelectedType] = useState(1);
  const dispatch = useDispatch();
  const onClick = (dt) => {
    dispatch(setFoodType(dt));
    setSelectedType(dt.id);
  };
  return (
    <div className="bg-[#99353D]/90 flex justify-between items-center px-3 py-2 gap-3 rounded-2xl shadow-md font-nunito font-bold text-[13px]">
      {foodType?.map((it) => (
        <motion.div
          key={it.id}
          onClick={() => onClick(it)}
          className={
            selectedType == it.id
              ? "text-amber-500 bg-white rounded-2xl px-2 shadow-lg"
              : "text-white  "
          }
        >
          {it.name}
        </motion.div>
      ))}
    </div>
  );
}
