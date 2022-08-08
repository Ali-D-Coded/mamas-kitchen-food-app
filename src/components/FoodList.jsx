import React, { useEffect, useRef, useState } from "react";
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
  Input,
} from "antd";
import {
  setDateRange,
  currentDateRange,
  increaseCartQuantity,
  setTime,
  setTotalAmount,
  currentCartItems,
} from "../redux/slices/cart/cartSlice";
import { useGetAllPlansQuery } from "../redux/slices/items/getPlans";
import { useGetCategoriesQuery } from "../redux/slices/items/categoriesApiSlice";
import moment from "moment";
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
const defaultCheckedList = ["SUNDAY", "MONDAY", "TUESDAY"];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const FoodList = () => {
  
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();
  const itemRef = useRef();
  const formRef = useRef(null);
  const [selectedType, setSelectedType] = useState(1);
  const selectedFoodType = useSelector(selectCurrentFoodType);
  const [itemData, setItemData] = useState();
  const [selectedCategories, setSelectedCategories] = useState({
    id: null,
    days: [],
  });
  const [selectedItems, setSelectedItems] = useState();
  const [allItems, setAllitems] = useState([]);

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState();
  const dt = useSelector(currentDateRange);
const selectedItemData = useSelector(currentCartItems);

  // console.log("selectedFoodType: ", selectedFoodType);
  const [refresh, setRefresh] = useState(false);

  const onClick = (dt) => {
    // console.log('=================dt===================');
    // console.log(dt);
    // console.log('====================================');
    dispatch(setFoodType(dt));
    setSelectedType(dt.id);
  };

  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery(selectedFoodType?.name || "BREAKFAST");

  const { data: categoryData, isSuccess: catgorySucess } =
    useGetCategoriesQuery();

  useEffect(() => {
    setRefresh((prev) => !prev);
    setItemData(items);
  }, [selectedFoodType]);

  // console.log('====================================');
  // console.log({ dt, selectedItemData });
  // console.log('====================================');

  useEffect(() => {
    console.log("from useEffect");
    let mount = true;
    if (mount) {
      dispatch(setTotalAmount());
    }
    return () => {
      mount = false;
    };
  }, [dt, selectedItemData]);

  const onProceed = () => {
    console.log("Proceed clicked");
  };

  const onChangeDay = (value) => {
    console.log(`selected ${value}`);
    setSelectedCategories((prev) => {
      return {
        ...prev,
        days: prev.days.filter(it => it !== value),
      };
    });

    setSelectedDays(value);
  };
  // console.log({selectedCategories});

  // console.log('====================================');
  // console.log(selectedDays);
  // console.log('====================================');
  const onSearchDay = (value) => {
    console.log("search:", value);
  };

  const { data: PlansDt, isSuccess: plansSucces } = useGetAllPlansQuery();

  if (plansSucces) {
// console.log(PlansDt);
    var foodType = PlansDt;
      dispatch(
        setTime({
          breakfast: PlansDt?.find((it) => it.name == "BREAKFAST").planDetails,
          lunch: PlansDt?.find((it) => it.name == "LUNCH").planDetails,
          dinner: PlansDt?.find((it) => it.name == "DINNER").planDetails,
        })
      );
  }
  function addItemtoCart(values) {
    setSelectedItems(values);
    // console.log(values);
  }

  const onChangeDate = (value) => {
    const dates = value.map((it) => it._d);
    console.log(dates);
    // setDateR(dates);
    dispatch(setDateRange({ dateRange: dates }));
  };

  const onFinish = (values) => {
    console.log({ values, itm: selectedItems });
    const items = [];
      if (allItems?.find((it) => it.item.id == selectedItems.id) == null) {
        setAllitems((prev) => {
          return [
            ...prev,
            {
              days: values.days,
              item: selectedItems,
            },
          ];
        });
    }
    
    dispatch(
      increaseCartQuantity({
        days: values.days,
        items: selectedItems,
      })
    );

    // dispatch(increaseCartQuantity({category:selectedItems.category_id,items: }));
  };

  // console.log("===================allItems=================");
  // console.log(allItems);
  // console.log("=====================allItems===============");

  const onChangeCheckBox = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  // console.log(checkedList);

  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );
  const onChangeCollapse = (key) => {
    console.log(key);
    setSelectedCategories({
      id: key,
      days: checkedList,
    });
  };

  // console.log('====================================');
  // console.log(selectedCategories);
  // console.log('====================================');

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div className="grid place-items-center pt-10 pb-28 ">
        <div className="sticky top-[5rem] z-50 grid h-auto mb-4">
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
          <RangePicker
            size="small"
            onChange={onChangeDate}
            defaultValue={
              dt && [moment(dt[0], "YYYY/MM/DD"), moment(dt[1], "YYYY/MM/DD")]
            }
          />
        </div>

        <div className="text-center pl-2">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <hr className="my-2" />
          {/* <Divider /> */}
          <div className="flex">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChangeCheckBox}
            />
          </div>
        </div>
        <Divider />

        {isSuccess &&
          lodesh.flatten(itemData).map((cat) => {
            return (
              <Collapse
                className="w-[90%]"
                accordion={true}
                key={cat.id}
                onChange={onChangeCollapse}
              >
                <Collapse.Panel header={cat.name} key={cat.id}>
                  {cat.items.map((it) => {
                    return (
                      <Form name="cart" onFinish={onFinish} ref={formRef}>
                        <div
                          className="w-full bg-white shadow-md rounded-sm px-2 py-2 my-5"
                          // onClick={() => addItemtoCart(it)}
                          key={it.id}
                        >
                          <div className="flex justify-between">
                            <div className="flex flex-col items-center ">
                              <p className="">{it.name}</p>

                              <Form.Item
                                name="days"
                                rules={[{ required: true }]}
                              >
                                <Select
                                  allowClear
                                  showSearch
                                  placeholder="Select Days"
                                  optionFilterProp="children"
                                  mode="multiple"
                                  onChange={onChangeDay}
                                  // onSearch={onSearchDay}
                                  filterOption={(input, option) =>
                                    option.children
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  style={{
                                    width: "200px",
                                  }}
                                >
                                  {selectedCategories?.days?.map((it) => (
                                    <Select.Option value={it}>
                                      {it}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="self-center my-2">
                              <Image
                                preview={false}
                                src={`${fromImageToUrl(
                                  it?.images[0],
                                  "/items/images/"
                                )}`}
                              />
                            </div>
                          </div>
                          <Form.Item className="w-full">
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="w-full"
                              onClick={() => addItemtoCart(it)}
                            >
                              OK
                            </Button>
                          </Form.Item>
                        </div>
                      </Form>
                    );
                  })}
                </Collapse.Panel>
              </Collapse>
            );
          })}
      </div>
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
