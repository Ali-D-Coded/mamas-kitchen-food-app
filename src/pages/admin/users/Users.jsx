import {
  Button,
  Divider,
  Empty,
  Input,
  message,
  Modal,
  PageHeader,
  Popconfirm,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdOutlineMoreVert } from "react-icons/md";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/slices/user/userApiSlice";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
const Users = () => {
  const [filterTable, setFilterTable] = useState(null);
  const { data: Users, isLoading } = useGetAllUsersQuery();
  const [
    updateUSer,
    {
      isSuccess: successUpdate,
      isLoading: loadingUpdate,
      isError: errorUpdate,
    },
  ] = useUpdateUserMutation();
  const [
    blockUserfn,
    { isSuccess: deleteSuccess, isLoading: loadDelete, isError: deleteError },
  ] = useBlockUserMutation();
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [userToblock, setUserToBolock] = useState(null);

  const showModal = (value) => {
    setIsModalVisible(true);
    setModalItem(value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log({ Users });
  const dataSource = Users?.map((it) => ({
    id: it.id,
    name: it.name,
    phone: it.mob_no,
    created: format(new Date(it.createdAt), "dd/MM/yyyy"),
    address: it.addresses,
    status: it.blocked ? "Blocked" : "Active",
    action: it,
  }));

  const blockUser = (block, id) => {
    console.log({ block, id });
    try {
      blockUserfn({
        id,
        block,
      });
    } catch (error) {
      console.log(error);
    }
    // window.location.reload();
  };
  

  if (loadDelete) message.loading("Loading");
  if (deleteError) message.loading("Some thing went wrong");
  if (deleteSuccess) {
    message.success("Blocked User Successfully");
    // window.location.reload();
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
        bordered
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
                <address className="max-h-20">
                  <h1>{it.address_type} :</h1>
                  {it.address}
                </address>
              </>
            ));
          }}
        />
        <Table.Column title="Status" dataIndex="status" />
        <Table.Column
          title="Action"
          dataIndex="action"
          render={(record) => {
            console.log({ record });
            return (
              <div className="flex gap-3">
                {/* <Switch
                  checkedChildren="UnBlock"
                  unCheckedChildren="Block"
                  defaultChecked={record.blocked}
                  onChange={
                    blockUser
                    // setUserToBolock(record?.id);
                  }
                  onClick={() => setUserToBolock(record?.id)}
                /> */}
                <Popconfirm
                  placement="topRight"
                  title="Are You Sure"
                  onConfirm={() => blockUser(true, record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="bg-red-500 w-20 text-white rounded px-2">
                    Block
                  </button>
                </Popconfirm>
                <Popconfirm
                  placement="topRight"
                  title="Are You Sure"
                  onConfirm={() => blockUser(false, record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="bg-green-500 w-20 text-white rounded px-2">
                    Un_Block
                  </button>
                </Popconfirm>
                <div>
                  <Tooltip title="Show More">
                    <MdOutlineMoreVert
                      className="text-2xl"
                      onClick={() => showModal(record)}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          }}
        />
      </Table>
      <Modal
        title={modalItem.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <b>Phone&nbsp;:&nbsp;</b>
          {modalItem.mob_no}
        </p>
        <p>
          <b>Member Since&nbsp;:&nbsp;</b>
          {modalItem.createdAt &&
            format(new Date(modalItem.createdAt), "dd/MM/yyyy")}
        </p>
        <b>Addresses &nbsp;:</b>
        {modalItem.addresses?.map((it) => (
          <dl>
            <dt>{it.address_type}</dt>
            <dd>{it.address}</dd>
          </dl>
        ))}
        <div>
          <Divider orientation="center">Plan Details</Divider>
          {modalItem?.orders?.length > 0 ? (
            <div>
              <b>Duration&nbsp;:&nbsp;</b>
              <span>
                {format(new Date(modalItem.orders[0].from), "dd/MM/yyyy")}
              </span>
              &nbsp;-&nbsp;
              <span>
                {format(new Date(modalItem.orders[0].to), "dd/MM/yyyy")}
              </span>
              <br />
              <b>Delivery Details&nbsp;:&nbsp;</b>
              {modalItem.orders[0].delivery.map((it) => (
                <pre key={it.day}>
                  <b>{it.day}&nbsp;:&nbsp;</b>
                  <span>{it.del}</span>
                </pre>
              ))}
              <br />
              <b>Items&nbsp;:&nbsp;</b>
              {modalItem.orders[0].items?.map((it) => (
                <Tag color="geekblue">{it.item?.name}</Tag>
              ))}
              <br />
              <br />
              <b>Amount Paid&nbsp;:&nbsp;</b>
              <span>{formatCurrency(modalItem.orders[0].total_amt)}</span>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Users;
