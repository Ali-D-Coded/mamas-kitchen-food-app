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
import EditCategory from "./EditCategory";

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

const CategoryTable = () => {
  const [
    deleteCat,
    { isSuccess: dltSucc, isError: dltErr, isLoading: dltLoad },
  ] = useDeleteCategoryMutation();
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState();
  const {
    data: CateData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  const showDrawer = (value) => {
    setEditItem(value);
    setVisible(true);
  };
  const onSearch = (e) => setSearch(e.target.value);
  const onClose = () => {
    setVisible(false);
  };

  if (isSuccess) {
    var dataGood = CateData.map((it) => ({
      key: it.id,
      name: it.name,
      items: it.items,
      actions: it,
    }));
  }
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
    { dataIndex: "name", title: "Name" },
    {
      dataIndex: "items",
      title: "Items",
      render: (record) => record.map((it) => <Tag>{it.name}</Tag>),
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
            <Popconfirm
              onConfirm={() => deleteCategory(record)}
              okButtonProps={{ loading: isLoading }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
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
            x: 600,
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
        <EditCategory editItem={editItem} close={onClose} />
      </Drawer>
    </div>
  );

  return content;
};

export default CategoryTable;
