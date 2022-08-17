import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tag,
} from "antd";
import React, { forwardRef, useEffect, useState } from "react";
import { useGetAllItemsQuery } from "../../redux/slices/items/getAllItemsForAdmin";
import { useGetItemsQuery } from "../../redux/slices/items/itemsApiSlice";
import { fromImageToUrl } from "../../utils/urls";
import { AiOutlinePlus } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import * as lodesh from "lodash";
import { useImperativeHandle } from "react";
import { useRef } from "react";
import { useUpdateOrdersMutation } from "../../redux/slices/orders/ordersApiSlice";
export const EditPlan = ({ orders }) => {
  const { data: items } = useGetAllItemsQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState();
  const editRef = useRef();

  const showModal = (value) => {
    console.log(value);
    setEditItem(value);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    editRef.current.formSubmit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    editRef.current.onReset();
  };

  // console.log("====================================");
  // console.log({ items, orders });
  // console.log(orders?.map(it => it.items))
  const orderedItems = lodesh
    .flatten(orders?.map((it) => it.items))
    .map((it) => it.item)
    .filter((it) => it !== null)
    .map((it) => it.id);
  const orderItems = lodesh
    .flatten(orders?.map((it) => it.items))
    .filter((it) => it.item !== null);

  console.log(lodesh.flatten(orders)[0].id);

  // console.log(lodesh.union(items,orderedItems));

  return (
    <div>
      <Form>
        {items?.map((it) => {
          {
            /* console.log(orderedItems.includes(it.id));
          console.log(it.id); */
          }
          return (
            <Row className="" key={it.id}>
              <Col span={24}>
                <Form.Item>
                  {/* <Input /> */}
                  <div
                    className={`flex justify-between items-center shadow-sm px-2 py-3 rounded-md ${
                      orderedItems.includes(it.id) && "bg-amber-200"
                    }`}
                  >
                    <Image
                      preview={false}
                      width={80}
                      height={60}
                      src={fromImageToUrl(it.images[0], "items/images")}
                    />
                    <h1>{it.name}</h1>
                    <div
                      className="bg-sky-500 grid place-items-center rounded-full h-8 w-8"
                      onClick={() => {
                        if (orderedItems.includes(it.id)) {
                          const dt = orderItems.find((item) => {
                            return item.item.id == it.id && item;
                          });
                          showModal(dt);
                          editRef.current.onReset();
                        } else {
                          showModal(it);
                          editRef.current.onReset();
                        }
                      }}
                    >
                      {orderedItems.includes(it.id) ? (
                        <TbEdit />
                      ) : (
                        <AiOutlinePlus />
                      )}
                    </div>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          );
        })}
      </Form>
      <Modal
        title={editItem?.name || editItem?.item.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <EditForm
          editItem={editItem}
          modal={isModalVisible ? true : false}
          ref={editRef}
          orderId={lodesh.flatten(orders)[0].id}
        />
      </Modal>
    </div>
  );
};

export const EditForm = forwardRef(({ editItem, modal, orderId }, ref) => {
  const [form] = Form.useForm();
  const [updateOrder, { isError, isLoading, isSuccess }] =
    useUpdateOrdersMutation();
  // console.log("====================================");
  // console.log({ editItem, orderId });
  // console.log("====================================");

  console.log(modal);

  // const DAYS = [
  //   { id: 1, d: "SUNDAY" },
  //   { id: 2, d: "MONDAY" },
  //   { id: 3, d: "TUESDAY" },
  //   { id: 4, d: "WEDNESDAY" },
  //   { id: 5, d: "THURSDAY" },
  //   { id: 6, d: "FRIDAY" },
  //   { id: 7, d: "SATURDAY" },
  // ];
  const DAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  useImperativeHandle(ref, () => ({
    onReset() {
      form.resetFields();
    },
    formSubmit() {
      form.submit();
    },
  }));

  const onFinish = async (newDays) => {
    console.log({ newDays, editItem });


    try {
      const res = await updateOrder({
        id: orderId,
        newDays,
        editItem,
      }).unwrap();
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) message.loading("Loading");
  if (isError) message.error("Something Went wrong");
  if (isSuccess) {
    message.success("Success");
    window.location.reload();
  }

  return (
    <Form
      onFinish={onFinish}
      form={form}
      // initialValues={{
      //   days: editItem?.days,
      // }}
    >
      <div className="my-5 shadow-sm px-2 py-3">
        {editItem?.days?.map((it) => (
          <Tag key={it} color="success">
            {it}
          </Tag>
        ))}
      </div>
      <Form.Item name="days">
        <Select mode="multiple">
          {DAYS.map((it) => (
            <Select.Option key={it} value={it} />
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});
