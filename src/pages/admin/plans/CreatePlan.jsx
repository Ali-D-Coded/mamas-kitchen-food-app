import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import { useCreatePlanMutation } from "../../../redux/slices/plans/plansApiSlice";

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

export const CreatePlan = () => {
  const [form] = Form.useForm();

  const [createPlan, { isSuccess, isLoading, isError }] =
    useCreatePlanMutation();

  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    try {
      await createPlan({
        planTypeName: values.time,
        planDetes: values.sights,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  return (
    <div>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="time"
          label="Time"
          rules={[
            {
              required: true,
              message: "Missing time",
            },
          ]}
        >
          <Select options={times} onChange={handleChange} />
        </Form.Item>
        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.time !== curValues.time ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Sight"
                        name={[field.name, "sight"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing sight",
                          },
                        ]}
                      >
                        <Select
                          disabled={!form.getFieldValue("time")}
                          style={{
                            width: 130,
                          }}
                        >
                          {(sights[form.getFieldValue("time")] || []).map(
                            (item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Price"
                    name={[field.name, "price"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing price",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add sights
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
