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
import { useCreateCategoriesMutation } from "../../../redux/slices/items/categoriesApiSlice";
const { Option } = Select;


const CreateCategory = () => {
    const [createCategories, { isLoading, isSuccess, isError }] = useCreateCategoriesMutation()
    const [refresh, setRefresh] = useState(false)

useEffect(() => {
  let Mount = true;
    if (Mount) {
    setRefresh(true)
}
  return () => {
    Mount = false;
  };
}, [isSuccess]);

   async function onFinish(values){
    try {
        const res = await createCategories({
            	"name": values.name
        })
        console.log(res);
    } catch (error) {
        console.log(error);
    }
    }
    function onFinishFailed(errorInfo) { console.log(errorInfo); }
    
    if (isLoading) {
        const hide = message.loading("Action in progress..", 0);
         setTimeout(hide, 2500); 
    }
    if (isSuccess) {
 message.success("Category Cretaed SucccessFully");
    }
    if(isError){
        message.error("Something Went wrong")
    }

  return (
    <>
      <Form
        layout="horizontal"
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

export default CreateCategory;
