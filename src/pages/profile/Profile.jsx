import {
  Avatar,
  Card,
  Divider,
  Empty,
  Image,
  Input,
  Modal,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { useGetUserMeQuery } from "../../redux/slices/user/userApiSlice";
import { differenceInCalendarDays, format } from "date-fns";
import mmaLogo from "../../assets/mamasLogo.png";
const { TabPane } = Tabs;
import { IoLogOut } from "react-icons/io5";
import { logOut } from "../../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity } from "../../redux/slices/cart/cartSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import { EditProfile } from "./EditProfile";
import { EditPlan } from "./EditPlan";

const Profile = () => {
  const { data, isLoading, isSuccess } = useGetUserMeQuery();
  const [isModalVisibleProfile, setIsModalVisibleProfile] = useState(false);
  const [isModalVisiblePlan, setIsModalVisiblePlan] = useState(false);

  const showModalPlan = () => {
    setIsModalVisiblePlan(true);
  };
  const showModalProfile = () => {
    setIsModalVisibleProfile(true);
  };

  const handleOkPlan = () => {
    setIsModalVisiblePlan(false);
  };
  const handleOkProfile = () => {
    setIsModalVisibleProfile(false);
  };

  const handleCancelPlan = () => {
    setIsModalVisiblePlan(false);
  };
  const handleCancelProfile = () => {
    setIsModalVisibleProfile(false);
  };
  console.log(isSuccess && data);

  const dispatch = useDispatch();
  function logout() {
    dispatch(decreaseCartQuantity());
    dispatch(logOut());
  }
  return (
    <div className="flex flex-col  h-screen">
      <div className="bg-[#99353D] h-1/3 flex flex-col items-center justify-end relative">
        <div className="absolute top-0 w-full shadow-md py-2 px-5">
          <span className="flex justify-between gap-1">
            <div className="shadow-xl border-1 border-red-300 rounded-full w-14 h-14 grid place-items-center">
              <Link to="/">
                <Image src={mmaLogo} width="50px" preview={false} />
              </Link>
            </div>
            <h1 className="text-amber-200 text-xl font-nunito self-end flex justify-between gap-3 items-center">
              Mamas Kitchen
              <IoLogOut className="text-3xl" onClick={logout} />
            </h1>
          </span>
        </div>
        <div>
          <Image
            src="https://joeschmoe.io/api/v1/random"
            preview={false}
            className="my-1 border"
            width={120}
          />
          <h1 className="text-white font-nunito text-center text-xl">
            {data?.name}
          </h1>
        </div>
      </div>
      <div>
        <Tabs type="card">
          <TabPane
            tab="Profile"
            key="1"
            className="flex justify-center items-center"
          >
            <Card className="w-[80%] text-center relative">
              <div className="absolute top-5 right-5">
                <SettingOutlined onClick={showModalProfile} />
              </div>
              <h1 className="">{data?.mob_no}</h1>
              <p>
                Member Since &nbsp;
                {data && format(new Date(data?.createdAt), "dd/MM/yyyy")}
              </p>
              <Divider>Delivery Address</Divider>
              <p>
                {
                  <address>
                    {data?.addresses.map((it) => (
                      <pre className="font-bold">
                        {it.address_type} : {it.address}
                      </pre>
                    ))}
                  </address>
                }
              </p>
            </Card>
            <Modal
              centered
              title="Edit Profile"
              visible={isModalVisibleProfile}
              onOk={handleOkProfile}
              onCancel={handleCancelProfile}
            >
              <EditProfile editData={data} />
            </Modal>
          </TabPane>
          <TabPane tab="Current Plan" key="2">
            {data?.orders.length >= 1 ? (
              data?.orders.map((it) => {
                const diffinDays = differenceInCalendarDays(
                  new Date(it.to),
                  new Date(it.from)
                );
                return (
                  <div className="shadow-md border px-2 py-2 grid place-items-center my-3 py-5 mx-10 my-2 rounded-xl relative">
                    <div className="absolute top-5 right-5">
                      <SettingOutlined onClick={showModalPlan} />
                    </div>
                    <h1>Plan ID:&nbsp; {it.id}</h1>
                    <div className="flex flex-col gap-2">
                      <span>
                        Number of Days: &nbsp;
                        <Tag color="geekblue">{diffinDays}</Tag>
                      </span>
                      <span>
                        Start Date:&nbsp;
                        <Tag color="geekblue">
                          {format(new Date(it.from), "dd/MM/yyyy")}
                        </Tag>
                      </span>
                      <span>
                        End Date:&nbsp;
                        <Tag color="geekblue">
                          {format(new Date(it.to), "dd/MM/yyyy")}
                        </Tag>
                      </span>
                      <span>
                        Total Cost:&nbsp;
                        <Tag color="geekblue">
                          {formatCurrency(it.total_amt)}
                        </Tag>
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty />
            )}
            <Modal
              centered
              title="Edit Plan"
              visible={isModalVisiblePlan}
              onOk={handleOkPlan}
              onCancel={handleCancelPlan}
            >
              <EditPlan orders={data?.orders} />
            </Modal>
          </TabPane>
          <TabPane tab="History" key="3">
            <Empty />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
