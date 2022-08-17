import { Button, Col, Divider, Form, Input, Row, Upload } from "antd";
import {UploadOutlined} from "@ant-design/icons"
import React, { forwardRef, useImperativeHandle } from "react";

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

export const EditProfile = forwardRef(({ editData }, ref) => {
  const [form] = Form.useForm();
  const work = editData.addresses.find((it) => it.address_type == "WORK");
  const home = editData.addresses.find((it) => it.address_type == "HOME");
    
  console.log({ editData, work, home });
  
  useImperativeHandle(ref, () => ({
    onReset() {
      form.resetFields();
    },
    formSubmit() {
      form.submit();
    },
  }));

  function onFinish(values) {
    console.log({values});
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: editData.name,
          phone: editData.mob_no,
          work: work.address,
          home: home.address,
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="pass" label="Password">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row> */}
        <fieldset>
          <Divider>Address</Divider>
          <Row>
            <Col span={24}>
              <Form.Item name="work" label="Work">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="home" label="Home">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </div>
  );
});
