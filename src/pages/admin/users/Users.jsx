import {
  Button,
  Divider,
  Input,
  message,
  PageHeader,
  Popconfirm,
  Table,
  Tabs,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/slices/user/userApiSlice";
import { format } from "date-fns";
import { useEffect, useState } from "react";
const Users = () => {
    const [filterTable, setFilterTable] = useState(null);
  const { data: Users, isLoading } = useGetAllUsersQuery();
  const [updateUSer,{isSuccess: successUpdate,isLoading: loadingUpdate ,isError: errorUpdate}] = useUpdateUserMutation()
  const [deleteUser, { isSuccess: deleteSuccess, isLoading: loadDelete, isError: deleteError }] = useDeleteUserMutation()
  const [refresh,setRefresh] = useState(false)
  console.log(Users);
  const dataSource = Users?.map((it) => ({
    id: it.id,
    name: it.name,
    phone: it.mob_no,
    created: format(new Date(it.createdAt), "dd/MM/yyyy"),
    address: it.addresses,
    action: it
  }));


  const deleteUserFn = (value) => {
    // console.log(value);
    deleteUser(value.id)
 window.location.reload()
  };

  if (loadDelete) message.loading("Loading")
  if (deleteError) message.loading("Some thing went wrong");
    if (deleteSuccess) {
      message.success("Deleted User Successfully");
    
  }
  
    const onSearch = (value) => {
      // const filterData = data.filter((item) => item.survey.includes(value));
      const filterData = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilterTable(filterData);
    };
    return (
      <div className="pt-10 px-5">
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Users"
          subTitle="This is a subtitle"
          extra={[
            <Input.Search
              className="bg-sky-300"
              placeholder="Search by..."
              enterButton={<SearchOutlined className="text-black" />}
              onSearch={onSearch}
            />,
          ]}
        />
        <Divider />

        <Table
          loading={isLoading}
          dataSource={filterTable == null ? dataSource : filterTable}
          scroll={{
            y: 600,
          }}
        >
          <Table.Column title="Name" dataIndex="name" />
          <Table.Column title="Phone" dataIndex="phone" />
          <Table.Column title="Member Since" dataIndex="created" />
          <Table.Column
            title="Address"
            dataIndex="address"
            render={(record) => {
              console.log(record);
              return record.map((it) => (
                <>
                  <address className="max-h-20 overflow-scroll">
                    <h1>{it.address_type} :</h1>
                    {it.address}
                  </address>
                </>
              ));
            }}
          />
          <Table.Column
            title="Action"
            dataIndex="action"
            render={(record) => {
              console.log(record);
              return (
                <div className="flex gap-3">
                  <Popconfirm
                    placement="topRight"
                    title="Are You Sure"
                    onConfirm={() => deleteUserFn(record)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              );
            }}
          />
        </Table>
      </div>
    );
};

export default Users;
