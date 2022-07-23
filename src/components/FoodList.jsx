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
} from "antd";
import { increaseCartQuantity } from "../redux/slices/cart/cartSlice";
import { useGetAllPlansQuery } from "../redux/slices/items/getPlans";
import { useGetCategoriesQuery } from "../redux/slices/items/categoriesApiSlice";


const FoodList = () => {
  const dispatch = useDispatch();
  const selectedFoodType = useSelector(selectCurrentFoodType);
  const [itemData, setItemData] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedItems, setSelectedItems] = useState([
    {
      item: null,
      days: [],
      delivery: "",
    },
  ]);


  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState();

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

  // if (plansSucces) {
  //   var foodType = PlansDt;
  // }
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
    // console.log({
    //   selectedItems,
    //   selectedFoodType: selectedFoodType.name,
    //   selectedCategories,
    //   selectedDays,
    //   selectedDelivery,
    // });
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
        <Divider />
   

        {isSuccess &&
          lodesh.flatten(itemData).map((cat) => {
            return (
              <Collapse className="w-[90%]">
                <Collapse.Panel
                  header={cat.name}
                  extra={[
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
                    </div>,
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
                    </div>,
                  ]}
                >
                  {cat.items.map((it) => {
                    return (
                      <div
                        className="w-full bg-white shadow-md rounded-sm px-2 py-2 my-5 flex justify-between items-center"
                        onClick={() => addItemtoCart(it)}

                      >
                        {/* <Typography.Title level={6}> */}
                        <p className="">{it.name}</p>
                        {/* </Typography.Title> */}
                        {/* <div className="grid gap-2"> */}
                        <Image
                          src={`${fromImageToUrl(
                            it?.images[0],
                            "/items/images/"
                          )}`}
                        />
                        {/* </div> */}
                      </div>
                    );
                  })}
                </Collapse.Panel>
              </Collapse>
            );
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
