import { Button, Col, Divider, Form, Input, Row, Upload } from "antd";
import {UploadOutlined} from "@ant-design/icons"
import React from "react";

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

export const EditProfile = ({ editData }) => {

    const work = editData.addresses.find((it) => it.address_type == "WORK");
    const home = editData.addresses.find((it) => it.address_type == "HOME");
    
    console.log({editData,work,home});
  return (
    <div>
      <Form
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
              <Form.Item name="home" label="Hme">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </div>
  );
};
