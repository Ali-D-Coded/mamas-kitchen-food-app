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
// import CategoryTable from "./CategoryTable";
import { PlusOutlined } from "@ant-design/icons";
import PlansTable from "./PlansTable";
import { CreatePlan } from "./CreatePlan";
// import CreateCategory from "./CreateCategory";

const { Title } = Typography;
const { TabPane } = Tabs;
const Plans = () => {
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
        title="Plans"
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
            Create Plans
          </Button>,
        ]}
        footer={
          <Tabs>
            <TabPane key="1">
              <PlansTable />
            </TabPane>
          </Tabs>
        }
      />

      <Drawer
        title="Create a new Plan"
        width={520}
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
        <CreatePlan />
      </Drawer>
    </div>
  );
};

export default Plans;
