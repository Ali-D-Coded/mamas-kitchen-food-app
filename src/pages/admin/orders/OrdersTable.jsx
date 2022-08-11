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
import { differenceInCalendarDays, format } from "date-fns";
import React, { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/slices/items/categoriesApiSlice";
import { useGetAllOrdersQuery } from "../../../redux/slices/orders/ordersApiSlice";
import { formatCurrency } from "../../../utils/formatCurrency";


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

const OrdersTable = () => {
  const [
    deleteCat,
    { isSuccess: dltSucc, isError: dltErr, isLoading: dltLoad },
  ] = useDeleteCategoryMutation();
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState();
  const {
    data: ordersData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllOrdersQuery();

  const showDrawer = (value) => {
    setEditItem(value);
    setVisible(true);
  };
  const onSearch = (e) => setSearch(e.target.value);
  const onClose = () => {
    setVisible(false);
  };

    if (isSuccess) {
      console.log(ordersData);
    var dataGood = ordersData.map((it) => ({
      key: it.id,
      user: it.user.name,
      items: it.items,
      deliver: it.delivery,
      from: it.from,
        to: it.to,
      totDays:   differenceInCalendarDays(
          new Date(it.to),
          new Date(it.from)
        ),
      total_amt: it.total_amt,
      actions: it,
    }));
    }
    console.log(dataGood);
  // const { Search } = Input;
  // const onSearch = (value) => console.log(value);

  // console.log(dataGood);

  async function deleteCategory(values) {
    console.log(values);
    try {
      await deleteCat(values.id).unwrap();
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
    { dataIndex: "user", title: "User" },
    {
      dataIndex: "items",
      title: "Items",
      render: (record) => record?.map((it) => <Tag>{it.item?.name}</Tag>),
    },
    {
      dataIndex: "deliver",
      title: "Delivery Details",
      render: (record) =>
        record?.map((it) => (
          <pre>
            <strong>{it.day}</strong>&nbsp;: <Tag>{it.del}</Tag>
          </pre>
        )),
    },
    {
      dataIndex: "from",
      title: "From",
      render: (record) => <Tag>{format(new Date(record), "dd/MM/yyyy")}</Tag>,
    },
    {
      dataIndex: "to",
      title: "To",
      render: (record) => <Tag>{format(new Date(record), "dd/MM/yyyy")}</Tag>,
    },
    {
      dataIndex: "totDays",
      title: "Total Days",

      render: (record) => <pre>{record}&nbsp;days</pre>,
    },
    {
      dataIndex: "total_amt",
      title: "Total Amount",
      render: (record) => <pre>{formatCurrency(record)}</pre>,
    },
    // {
    //   dataIndex: "actions",
    //   title: "Actions",

    //   render: (record) => {
    //     return (
    //       <div className="flex gap-3">
    //         <Button onClick={() => showDrawer(record)} type="primary">
    //           Edit
    //         </Button>
    //         <Popconfirm
    //           onConfirm={() => deleteCategory(record)}
    //           okButtonProps={{ loading: isLoading }}
    //         >
    //           <Button type="primary" danger>
    //             Delete
    //           </Button>
    //         </Popconfirm>
    //       </div>
    //     );
    //   },
    // },
  ];

  let content;
  content = (
    <div>
      <Divider />
      <div className="">
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
        title="Edit Category"
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
        {/* <EditCategory editItem={editItem} close={onClose} /> */}
      </Drawer>
    </div>
  );

  return content;
};

export default OrdersTable;
