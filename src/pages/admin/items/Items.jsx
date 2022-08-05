// import { Button, Typography } from "@mui/material";
import { Button, Input, PageHeader, Tabs, Typography,Drawer, Space,Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemsTable from "../../../components/ItemsTable";
import CreateItems from "./CreateItems";
import EditItem from "./EditItem";
import { useGetAllItemsQuery } from "../../../redux/slices/items/getAllItemsForAdmin";
const { TabPane } = Tabs;
const { Column } = Table;
const Items = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState()
  const [visible, setVisible] = useState(false);
  const [editData,setEditData] = useState()
  const [visibleEdit, setVisibleEdit] = useState(false);
  const { Title } = Typography;
  const goCreate = () => {
navigate("create-items");
  }
   const showDrawer = () => {
    setVisible(true);
  };
  const showEditDrawer = (value) => {
     console.log(value);
     setVisibleEdit(true);
     setEditData(value)
  };
  const onClose = () => {
    setVisible(false);
  };
  const onCloseEdit = () => {
    setVisibleEdit(false);
    window.location.reload()
  };
    // const { Search } = Input;
  const onSearch = (e) => setSearch(e.target.value)
  
  console.log("search:", search);
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
       render: (record) => (
         <div className="flex gap-3">
           <Button type="primary" onClick={() => showEditDrawer(record)}>
             Edit
           </Button>
           <Button type="dashed">Delete</Button>
         </div>
       ),
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
       category: it.category.name,
       description: it.description,
       price: it.price,
       food_type: it.food_type,
      action: it
     }));
   }

   console.log(dataGood);
  //  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div className="pt-10 px-5">
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Meals"
        subTitle="This is a subtitle"
        extra={[
          <Input.Search
            allowClear
            placeholder="input search text"
            value={search}
            name={search}
            onChange={(e) => onSearch(e)}
            // style={{ width: 200, height: 30 }}
          />,
          <Button key="1" type="primary" onClick={showDrawer}>
            Create Meals
          </Button>,
        ]}
        footer={
          <Tabs>
            <TabPane key="1">
              {/* <ItemsTable editDrawer={(v) => showEditDrawer(v)} /> */}
              <div className="px-5">
                <Table
                  loading={isLoading}
                  // rowSelection={{
                  //   type: selectionType,
                  //   ...rowSelection,
                  // }}
                  // columns={columns}
                  dataSource={dataGood}
                  scroll={{
                    y: 500,
                    // x: 600,
                  }}
                >
                  <Column dataIndex="name" title="Name" />
                  <Column dataIndex="category" title="Category" />
                  <Column dataIndex="food_type" title="Food Type" />
                  <Column dataIndex="price" title="Price" />
                  <Column dataIndex="action" title="Action" render={(record) => (
         <div className="flex gap-3">
           <Button type="primary" onClick={() => showEditDrawer(record)}>
             Edit
           </Button>
           <Button type="dashed">Delete</Button>
         </div>
       )} />
                </Table>
              </div>
            </TabPane>
          </Tabs>
        }
      />
      <Drawer
        title="Create an Item"
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
        <CreateItems />
      </Drawer>
      <Drawer
        title="Edit Item"
        width={420}
        onClose={onCloseEdit}
        visible={visibleEdit}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCloseEdit} >Cancel</Button>
          </Space>
        }
      >
        <EditItem editData={editData} close={onCloseEdit} />
      </Drawer>
    </div>
  );
};

export default Items;
