import { Alert, Button, Divider, Input, Radio, Spin, Table } from "antd";
import React, { useState } from "react";
import { useGetAllItemsQuery } from "../redux/slices/items/getAllItemsForAdmin";

const columns = [
  { dataIndex: "name", title: "Name" },
  { dataIndex: "description", title: "Description" },
  {
    dataIndex: "category",
    title: "Category",
    render: (record) => <p>{record?.name}</p>,
  },
  {
    dataIndex: "price",
    title: "Price",
  },
  {
    dataIndex: "food_type",
    title: "Food Type",
  },
  {
    dataIndex: "actions",
    title: "Actions",
    render: () => <Button>Edit</Button>,
  },
];

const data = [
  {
    key: "1",
    name: "Burger",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type: "BREAKFAST",
  },
  {
    key: "2",
    name: "Sandwitch",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type: "BREAKFAST",
  },
  {
    key: "3",
    name: "Cutlet",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type: "BREAKFAST",
  },
];

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

const ItemsTable = () => {
  const {
    data: itemData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllItemsQuery();

  if (isSuccess) {
    var dataGood = itemData.map((it) => ({
      key: it.id,
      name: it.name,
      category: it.category,
      description: it.description,
      price: it.price,
      food_type: it.food_type,
    }));
  }
  const { Search } = Input
  const onSearch = (value) => console.log(value);

  console.log(dataGood);
  const [selectionType, setSelectionType] = useState("checkbox");
  let content;
  content = isLoading ? (
    <Spin />
  ) : isError ? (
    <Alert
      message="Somethimg went wrong"
      description={error}
      type="error"
      closable
    />
  ) : (
    <div>
      {/* <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
          </Radio.Group> */}
      <div>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          enterButton="Search"
          style={{
            width:300,
            height: 10,
              }}
              size="large"
        />
      </div>

      <Divider />
      <div className="px-5">
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataGood}
          scroll={{
            y: 400,
            x:1500
          }}
        />
      </div>
    </div>
  );

  return content;
};

export default ItemsTable;
