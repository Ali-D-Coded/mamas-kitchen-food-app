import {
  Divider,
  Input,
  Table,
  Tag,
  Button,
  Drawer,
  Space,
  Popconfirm,
  message,
} from "antd";
import React, { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/slices/items/categoriesApiSlice";
import { useGetAllPlansAllQuery } from "../../../redux/slices/plans/plansApiSlice";
import { formatCurrency } from "../../../utils/formatCurrency";
import { EditPlan } from "./EditPlan";


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const PlansTable = () => {
  const [
    deleteCat,
    { isSuccess: dltSucc, isError: dltErr, isLoading: dltLoad },
  ] = useDeleteCategoryMutation();
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState();
  const {
    data: PlansData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllPlansAllQuery();

  const showDrawer = (value) => {
    setEditItem(value);
    setVisible(true);
  };
  const onSearch = (e) => setSearch(e.target.value);
  const onClose = () => {
    setVisible(false);
    window.location.reload()
  };

    
    if (isSuccess) {
      console.log(PlansData);
    // var dataGood = PlansData.map((it) => ({
    //   key: it.id,
    //   name: it.name,
    //   planCode: it.planCode,
    //   days: it.days,
    //   price: it.price,
    //   actions: it,
    // }));
        var dataGood = PlansData.map((it) => ({
          key: it.id,
          planCode: it.planName,
          time: it.plan.name,
          days: it.days,
          price: it.price,
          actions: it,
        }));
  }
  // const { Search } = Input;
  // const onSearch = (value) => console.log(value);

  // console.log(dataGood);

  async function deleteCategory(values) {
    console.log(values);
    try {
    //   await deleteCat(values.id).unwrap();
      if (dltSucc) {
        message.success("Category deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      if (dltErr) message.error("Something Went Wrong");
    }
  }

  const columns = [
    // { dataIndex: "name", title: "Name" },
    { dataIndex: "planCode", title: "Plan Code" },
    { dataIndex: "time", title: "Time" },
    { dataIndex: "days", title: "Days", className:"w-20"},
    {
      dataIndex: "price",
      title: "Price",
      render: (record) => <>{formatCurrency(record)}</>,
    },
    {
      dataIndex: "actions",
      title: "Actions",

      render: (record) => {
        return (
          <div className="flex gap-3">
            <Button onClick={() => showDrawer(record)} type="primary">
              Edit
            </Button>
            {/* <Popconfirm
              onConfirm={() => deleteCategory(record)}
              okButtonProps={{ loading: isLoading }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm> */}
          </div>
        );
      },
    },
  ];

  let content;
  content = (
    <div>
      <Divider />
      <div className="px-5">
        <Table
          columns={columns}
          dataSource={dataGood}
          scroll={{
            y: 400,
            x: "auto",
          }}
        />
      </div>
      <Drawer
        title="Edit Plan"
        width={420}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <EditPlan editItem={editItem} close={onClose} />
      </Drawer>
    </div>
  );

  return content;
};

export default PlansTable;
