import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
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
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../../redux/slices/items/categoriesApiSlice";
import { useCreateItemsMutation } from "../../../redux/slices/items/itemsApiSlice";
import APIClient from "../../../utils/axios";
const { Option } = Select;

const EditItem = ({ editData }) => {
    console.log({editData});
  const [createItems, { isLoading, isSuccess, isError }] =
    useCreateItemsMutation();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let Mount = true;
    if (Mount) {
      setRefresh(true);
    }
    return () => {
      Mount = false;
    };
  }, [isSuccess]);

  async function onFinish(values) {
    const data = new FormData();
    data.append("file", values.file[0]?.originFileObj);
    data.append("name", values.name);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("category_id", values.category);
    data.append("food_type", values.food_type);
    console.log(values);
    try {
      // const res = await createItems(data);
      const res = await APIClient.post("/items/create", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res);

      if (res.status == 201) {
        message.success("Category Cretaed SucccessFully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went wrong");
    }
  }
  function onFinishFailed(errorInfo) {
    console.log(errorInfo);
  }

  // if (isLoading) {
  //   const hide = message.loading("Action in progress..", 0);
  //   setTimeout(hide, 2500);
  // }
  // if (isSuccess) {
  //   message.success("Category Cretaed SucccessFully");
  // }
  // if (isError) {
  //   message.error("Something Went wrong");
  // }

  const { data: catData, isSuccess: catSuccess } = useGetCategoriesQuery();
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <>
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        encType
      >
        <Row>
          <Col span={24}>
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
              <Input placeholder="name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please enter Price",
                },
              ]}
            >
              <Input placeholder="price " />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="description" rows={2} showCount />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please enter Price",
                },
              ]}
            >
              <Select placeholder="select category">
                {catSuccess &&
                  catData.map((cat) => (
                    <Option value={cat.id}>{cat.name}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="food_type"
              label="Foo Type"
              rules={[
                {
                  required: true,
                  message: "Please enter Price",
                },
              ]}
            >
              <Select placeholder="Select Food Type">
                <Option value="BREAKFAST">BREAKFAST</Option>
                <Option value="LUNCH">LUNCH</Option>
                <Option value="DINNER">DINNER</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="file"
              label="Upload"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="file" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
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

export default EditItem;
