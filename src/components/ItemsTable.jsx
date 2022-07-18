import { Button, Divider, Radio, Table } from "antd";
import React, { useState } from "react";
import { useGetItemsQuery } from "../redux/slices/items/itemsApiSlice";

const columns = [
  { dataIndex: "name", title: "Name" },
  { dataIndex: "description", title: "Description" },
  {
    dataIndex: "category",
    title: "Category",
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
    render: () => (
      <Button>
        Edit
      </Button>
    )
    

  },
];

const data = [
  {
    key: "1",
    name: "Burger",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type:"BREAKFAST"
  },
   {
    key: "2",
    name: "Sandwitch",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type:"BREAKFAST"
  },
    {
    key: "3",
    name: "Cutlet",
    description: "lkjfaskhfasjasasd",
    price: "10",
    food_type:"BREAKFAST"
  },
];


 

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
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
   } = useGetItemsQuery();

   console.log("====================================");
   console.log(itemData);
   console.log("====================================");
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

       <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default ItemsTable