import { Avatar, Card, Divider, Image, Input, Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useGetUserMeQuery } from "../../redux/slices/user/userApiSlice";
import { format } from "date-fns";
import mmaLogo from "../../assets/mamasLogo.png";
const { TabPane } = Tabs;

const Profile = () => {
  const { data, isLoading, isSuccess } = useGetUserMeQuery();
  console.log(isSuccess && data);
  return (
    <div className="flex flex-col  h-screen">
      {/* <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/payment">
        <button>Payments</button>
      </Link> */}
      <div className="bg-[#99353D] h-1/3 flex flex-col items-center justify-end relative">
        <div className="absolute top-0 w-full shadow-md py-2 px-5">
          <span className="flex justify-between gap-1">
            <div
              
              className="shadow-xl border-1 border-red-300 rounded-full w-14 h-14 grid place-items-center
          "
            >
              <Link to="/">
                <Image src={mmaLogo} width="50px" preview={false} />
              </Link>
            </div>
            <h1 className="text-amber-200 text-xl font-nunito self-end">
              Mamas Kitchen
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
            <Card className="w-[80%] text-center">
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
          </TabPane>
          <TabPane tab="Current Plan" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="History" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
