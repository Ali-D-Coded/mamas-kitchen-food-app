import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../redux/slices/items/categoriesApiSlice";
import APIClient from "../../../utils/axios";
const { Option } = Select;

const EditCategory = ({ editItem, close }) => {
  console.log({ id: editItem.id });
const [loading, setLoading] = useState(false);

  async function onFinish(values) {
    try {
      const res = await APIClient.patch(`/category/${editItem.id}`, {
        name: values.name,
      });
      setLoading(true);
      console.log(res);
      if (loading) {
        message.loading("Action in progress..", 0);
      }
      if (res.status == 200 || res.status == 201) {
        setLoading(false);
          message.success("Category Updated SucccessFully");
          close();
          window.location.reload()
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went wrong");
    }
  }
  function onFinishFailed(errorInfo) {
    console.log(errorInfo);
  }

  return (
    <>
      <Form
        layout="horizontal"
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          name: editItem.name,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="bg-sky-400" htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditCategory;
