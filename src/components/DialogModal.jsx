import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../utils/formatCurrency";
import { API_URL, fromImageToUrl } from "../utils/urls";
import { useDispatch, useSelector } from "react-redux";
import { increaseCartQuantity } from "../redux/slices/cartSlice";
import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Container = styled.dialog`
  width: 400px;
  border-radius: 8px;
  border: 1px solid #888;

  ::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;
const { Meta } = Card;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const DialogModal = ({
  title,
  items,
  isOpened,
  onProceed,
  onClose,
  // children,
}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [selectedData, setSelectedData] = useState({
    food_type: null,
    date: [],
    day: null,
    delevery: null,
    category: null,
    items: null,
  });

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpened]);

  console.log(items);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  const preventAutoClose = (e) => e.stopPropagation();
  const fd = () => {};
  return (
    <Container ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}>
        {items.map((item) => (
          <Card
            key={item.id}
            style={{
              // width: 300,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 100,
            }}
            cover={
              <img
                height="100%"
                alt="example"
                src={`${fromImageToUrl(item.images[0], "/items/images/")}`}
              />
            }
            actions={[<SettingOutlined key="setting" />]}
          >
            <Meta title={item.name} description={item.description} />
            <Meta description={formatCurrency(item.price)} />
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DialogModal;
