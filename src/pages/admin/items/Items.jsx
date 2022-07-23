// import { Button, Typography } from "@mui/material";
import { Button, Input, PageHeader, Tabs, Typography,Drawer, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemsTable from "../../../components/ItemsTable";
import CreateItems from "./CreateItems";
const { TabPane } = Tabs;
const Items = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState()
  const [visible, setVisible] = useState(false);
  const { Title } = Typography;
  const goCreate = () => {
navigate("create-items");
  }
   const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
    // const { Search } = Input;
  const onSearch = (e) => setSearch(e.target.value)
  
  console.log("search:",search);
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
            style={{ width: 200, height: 30 }}
          />,
          <Button key="1" type="primary" onClick={showDrawer}>
            Create Meals
          </Button>,
        ]}
        footer={
          <Tabs>
            <TabPane key="1">
              <ItemsTable />
            </TabPane>
          </Tabs>
        }
      />
       <Drawer
        title="Create a new account"
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
    </div>
  );
};

export default Items;
