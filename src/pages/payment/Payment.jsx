import {
  Button,
  Cascader,
  Form,
  Image,
  Input,
  List,
  Modal,
  Select,
  Tag,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import mmaLogo from "../../assets/mamasLogo.png";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  currentCartItems,
  removeFromCart,
} from "../../redux/slices/cart/cartSlice";
import { fromImageToUrl } from "../../utils/urls";
import { CheckoutButton } from "../../components/CheckoutButton";

const StrpeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const Payment = () => {
  const cartItems = useSelector(currentCartItems);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveyDay, setDeliveyDay] = useState([]);
  const form = Form.useFormInstance();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function removeFromCart(item) {
    console.log(item);
    
  }

  function handleDelivery(day, del) {
    console.log({ day, del });
    setDeliveyDay((prev) => [
      ...prev,
      {
        day: day,
        del: del,
      },
    ]);
  }
  function handleDay(value) {
    console.log({ value });
  }

  console.log({ deliveyDay });

  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return (
    <div className=" relative h-screen">
      <div className="py-2 sticky top-0 z-10 bg-[#99353D] flex justify-between px-5 items-center">
        {/* <span className="bg-white text-red-800 rounded-2xl w-20 py-1 text-center font-semibold">
            Breakfast
          </span> */}

        <span className="flex justify-between gap-1">
          <Link to="/" className="flex justify-between items-center gap-1 py-1">
            <MdKeyboardArrowLeft className="text-white text-2xl" />
            <h1 className="text-amber-200 text-lg font-nunito self-end">
              Checkout
            </h1>
          </Link>
        </span>
        <div className="shadow-xl border-1 border-red-300 rounded-full w-14 h-14 grid place-items">
          <Image src={mmaLogo} width="50px" preview={false} />
        </div>
      </div>
      <main className=" h-[80%] mx-5 mt-5 overflow-y-scroll">
        <List
          className="mb-30"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => removeFromCart(item)} danger>
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    src={fromImageToUrl(item.item.images[0], "/items/images/")}
                    className="object-fill "
                  />
                }
                title={item.item.name}
                description={
                  <p className="flex gap-2 overflow-scroll w-50">
                    {item.days.map((it) => (
                      <Tag color="gold" className="text-small">
                        {it}
                      </Tag>
                    ))}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </main>
      <div className="fixed bottom-0 z-1000 w-full py-6 bg-[#99353D] self-end text-white flex justify-around items-center">
        {cartItems && (
          <Button onClick={showModal} type="primary">
            Set Delivery Options
          </Button>
        )}
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <CheckoutButton cartItems={cartItems} deliveryDetes={deliveyDay} />,
        ]}
      >
        <List
          className="mb-30"
          dataSource={days}
          renderItem={(item) => (
            <List.Item
              // onMouseLeave={() => handleDay(item)}
              actions={[
                <select
                  placeholder="Select Delivery"
                  className=" w-28 h-8 text-center border rounded text-black"
                  onChange={(e) => handleDelivery(item, e.target.value)}
                >
                  <option defaultValue>None</option>
                  <option>HOME</option>
                  <option>WORK</option>
                </select>,
              ]}
            >
              <List.Item.Meta title={item} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Payment;
