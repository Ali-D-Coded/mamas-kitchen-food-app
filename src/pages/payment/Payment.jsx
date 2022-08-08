import { Button, Image, List, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import mmaLogo from "../../assets/mamasLogo.png";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { currentCartItems, removeFromCart } from "../../redux/slices/cart/cartSlice";
import { fromImageToUrl } from "../../utils/urls";
import { CheckoutButton } from "../../components/CheckoutButton";

const StrpeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const Payment = () => {
  const cartItems = useSelector(currentCartItems)
  function removeFromCart(item) {
    console.log(item);
  }
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
      <main className=" h-[70%] mx-5 my-5 mb-10">
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
        ></List>
      </main>
      <div className="fixed bottom-0 z-1000 w-full py-6 bg-[#99353D] self-end text-white flex justify-around items-center">
        {cartItems && <CheckoutButton cartItems={cartItems} />}
      </div>
    </div>
  );
};

export default Payment;



