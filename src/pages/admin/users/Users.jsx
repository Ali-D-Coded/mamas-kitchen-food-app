import {Button, Divider, Input, PageHeader, Table, Tabs} from "antd"
import {SearchOutlined} from "@ant-design/icons"
import { useGetAllUsersQuery } from "../../../redux/slices/user/userApiSlice";
import {format} from "date-fns"
const Users = () => {
  const { data: Users, isLoading } = useGetAllUsersQuery()
  const dataSource = Users?.map((it) => ({
    name: it.name,
    phone: it.mob_no,
    created: format(new Date(it.createdAt), "dd/MM/yyyy"),
    // address: it.addresses,
  }));
  return (
    <div className="pt-10 px-5">
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Users"
        subTitle="This is a subtitle"
        extra={[
          <Input.Search
            allowClear
            placeholder="input search text"
            // value={search}
            // name={search}
            // onChange={(e) => onSearch(e)}
            style={{ width: 200, height: 30 }}
          />,
        ]}
      />
      <Divider />
      <Table loading={isLoading} dataSource={dataSource}>
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Phone" dataIndex="phone" />
        <Table.Column title="Member Since" dataIndex="created" />
        <Table.Column title="Address" dataIndex="address"  />
        <Table.Column title="Action" dataIndex="action" render={(record) => {
          return (<div className="flex gap-3">

  <Button color="red">DeActivate</Button>
  <Button type="primary" danger>Delete</Button>
          </div>
)
        }}  />
      </Table>
    </div>
  );
}

export default Users