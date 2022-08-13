import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import {
  useCreatePlanMutation,
  useGetAllPlanTimesQuery,
  useUpdatePlanMutation,
} from "../../../redux/slices/plans/plansApiSlice";

const { Option } = Select;
const times = [
  {
    label: "BREAKFAST",
    value: "BREAKFAST",
  },
  {
    label: "LUNCH",
    value: "LUNCH",
  },
  {
    label: "DINNER",
    value: "DINNER",
  },
];
const sights = {
  BREAKFAST: ["BF7DPLAN", "BF6DPLAN", "BF5DPLAN", "BF4DPLAN", "BF3DPLAN"],
  LUNCH: ["LC7DPLAN", "LC6DPLAN", "LC5DPLAN", "LC4DPLAN", "LC3DPLAN"],
  DINNER: ["DR7DPLAN", "DR6DPLAN", "DR5DPLAN", "DR4DPLAN", "DR3DPLAN"],
};

export const EditPlan = ({ editItem, close }) => {
  const [form] = Form.useForm();

  console.log({ editItem });

  const [updatePlan, { isSuccess, isLoading, isError }] =
    useUpdatePlanMutation();
  const { data: TimesDt } = useGetAllPlanTimesQuery();

  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    const data = {
      planDetesId: editItem.id,
      days: values.days,
      plan_code: values.plan_code,
      price: values.price,
      planId: values.time,
    };
    try {
      await updatePlan(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    message.loading("Loading");
  }
  if (isSuccess) {
    message.success("Plan Updated SuccessFully");
    close();
    window.location.reload();
  }
  if (isError) message.error("Something went wrong");

  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          plan_code: editItem.planName,
          time: editItem.plan.id,
          days: editItem.days,
          price: Number(editItem.price),
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item name="plan_code" label="Plan Code">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="time"
              label="Time"
              rules={[{ type: "enum", enum: [1, 2, 3] }]}
            >
              <Select>
                {TimesDt?.map((it) => (
                  <Select.Option key={it.id} value={it.id}>
                    {it.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="days" label="Days">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="price" label="Price" rules={[{ type: "integer" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
