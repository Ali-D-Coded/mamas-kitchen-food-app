import React, { useState } from "react";
import {
  Button,
  Drawer,
  Input,
  PageHeader,
  Space,
  Tabs,
  Typography,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import OrdersTable from "./OrdersTable";


const { Title } = Typography;
const { TabPane } = Tabs;
const Orders = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState();
  const showDrawer = () => {
    setVisible(true);
  };
  const onSearch = (e) => setSearch(e.target.value);
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="pt-10 px-5">
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Orders"
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
            Create Categories
          </Button>,
        ]}
        footer={
          <Tabs>
            <TabPane key="1">
              <OrdersTable />
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
        {/* <CreateCategory /> */}
      </Drawer>
    </div>
  );
};

export default Orders;
