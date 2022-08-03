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
  Typography,
  DatePicker,
  Form,
} from "antd";
import { increaseCartQuantity } from "../redux/slices/cart/cartSlice";
import { useGetAllPlansQuery } from "../redux/slices/items/getPlans";
import { useGetCategoriesQuery } from "../redux/slices/items/categoriesApiSlice";
import moment from "moment";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};
const FoodList = () => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(1);
  const selectedFoodType = useSelector(selectCurrentFoodType);
  const [itemData, setItemData] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedItems, setSelectedItems] = useState([
    {
      selected: false,
      item: null,
      days: [],
      delivery: "",
    },
  ]);

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState();

  // console.log("selectedFoodType: ", selectedFoodType);
  const [refresh, setRefresh] = useState(false);

  const onClick = (dt) => {
    dispatch(setFoodType(dt));
    setSelectedType(dt.id);
  };

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

  // console.log("itemData :", isSuccess && items?.map((it) => it.items));

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
    setSelectedDelivery(value);
  };
  const onSearchDelivery = (value) => {
    console.log("search:", value);
  };
  const { data: PlansDt, isSuccess: plansSucces } = useGetAllPlansQuery();

  const daysData = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const deliveryData = ["WORK", "HOME", "OTHER"];

  if (plansSucces) {
    var foodType = PlansDt;
  }
  function addItemtoCart(values) {
    setSelectedItems((prev) => [
      ...prev,
      prev.push({
        item: values,
        days: selectedDays,
        delivery: selectedDelivery,
      }),
    ]);
    console.log(selectedItems);
  
  }

  const onChangeDate = (value) => {
    console.log(value);
    console.log("value");
  };

  const onFinish = () => {};

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <Form name="cart" onFinish={onFinish}>
        <div className="grid place-items-center pt-10 pb-28 ">
          <div className="sticky top-1 z-50 grid h-auto mb-4">
            {/* <FoodtypeComponent foodType={PlansDt} /> */}
            <div className="bg-[#99353D]/90 flex justify-between items-center px-3 py-2 gap-3 rounded-2xl shadow-md font-nunito font-bold text-[13px]">
              {foodType?.map((it) => (
                <motion.div
                  key={it.id}
                  onClick={() => onClick(it)}
                  className={
                    selectedType == it.id
                      ? "text-amber-500 bg-white rounded-2xl px-2 shadow-lg"
                      : "text-white"
                  }
                >
                  {it.name}
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <Form.Item name="range-picker" {...rangeConfig}>
              <RangePicker size="small" />
            </Form.Item>
          </div>
          <Divider />

          {isSuccess &&
            lodesh.flatten(itemData).map((cat) => {
              return (
                <Collapse className="w-[90%]" accordion key={cat.id}>
                  <Collapse.Panel
                    header={cat.name}
                    key={cat.name}
                  >
                    {cat.items.map((it) => {
                      return (
                        <div
                          className="w-full bg-white shadow-md rounded-sm px-2 py-2 my-5 flex flex-col "
                          // onClick={() => addItemtoCart(it)}
                          key={it.id}
                        >
                          <div className="flex justify-between items-center">
                            {/* <Typography.Title level={6}> */}
                            <p className="">{it.name}</p>
                            {/* </Typography.Title> */}
                            {/* <div className="grid gap-2"> */}
                            <Image
                              preview={false}
                              src={`${fromImageToUrl(
                                it?.images[0],
                                "/items/images/"
                              )}`}
                            />
                            {/* </div> */}
                          </div>
                          <div className="self-center my-2">
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
                                <Select.Option value={it}>{it}</Select.Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      );
                    })}
                  </Collapse.Panel>
                </Collapse>
              );
            })}
        </div>
      </Form>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default FoodList;

// function FoodtypeComponent({ foodType }) {
//   const [selectedType, setSelectedType] = useState(1);
//   const dispatch = useDispatch();
//   const onClick = (dt) => {
//     dispatch(setFoodType(dt));
//     setSelectedType(dt.id);
//   };
//   return (
//     <div className="bg-[#99353D]/90 flex justify-between items-center px-3 py-2 gap-3 rounded-2xl shadow-md font-nunito font-bold text-[13px]">
//       {foodType?.map((it) => (
//         <motion.div
//           key={it.id}
//           onClick={() => onClick(it)}
//           className={
//             selectedType == it.id
//               ? "text-amber-500 bg-white rounded-2xl px-2 shadow-lg"
//               : "text-white  "
//           }
//         >
//           {it.name}
//         </motion.div>
//       ))}
//     </div>
//   );
// }
