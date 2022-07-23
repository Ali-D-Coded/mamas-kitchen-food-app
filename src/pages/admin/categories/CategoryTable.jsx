import { Divider, Input, Table, Tag, Button } from "antd";
import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../../redux/slices/items/categoriesApiSlice";


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
      render: () => <Button>Edit</Button>,
    },
  ];

  const data = [
    {
      key: "1",
      name: "Hot Platter",
      items: [{ name: "iu" }, { name: "iu" }, { name: "iu" }],
    },
    {
      key: "1",
      name: "Cold Platter",
      items: [{ name: "iu" }, { name: "iu" }, { name: "iu" }],
    },
    {
      key: "1",
      name: "Foul",
      items: [{ name: "iu" }, { name: "iu" }, { name: "iu" }],
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

  const CategoryTable = () => {
    const {
      data: CateData,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetCategoriesQuery();

    if (isSuccess) {
      var dataGood = CateData.map((it) => ({
        key: it.id,
        name: it.name,
        items: it.items,
      }));
    }
    // const { Search } = Input;
    // const onSearch = (value) => console.log(value);

    // console.log(dataGood);
    const [selectionType, setSelectionType] = useState("checkbox");
    let content;
    content = (
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
          {/* <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            enterButton="Search"
            style={{
              width: 300,
              height: 10,
            }}
            size="large"
          /> */}
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
              x: 600,
            }}
          />
        </div>
      </div>
    );

    return content;
  };


export default CategoryTable;
