import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Typography,
//   Box,
// } from "@mui/material";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";
// import { useTheme } from "@mui/material/styles";
import {formatCurrency} from "../utils/formatCurrency"
import { API_URL, fromImageToUrl } from "../utils/urls";
import { useDispatch, useSelector } from "react-redux";
import { increaseCartQuantity } from "../redux/slices/cartSlice";

const Container = styled.dialog`
  width: 400px;
  border-radius: 8px;
  border: 1px solid #888;

  ::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;

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
  const dispatch = useDispatch()

  const ref = useRef(null);
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState({
    food_type:null,
    date: [],
    day:null,
    delevery:null,
    category: null,
    items:null
  })

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpened]);


  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  const preventAutoClose = (e) => e.stopPropagation();
  const fd = () => {
}
  return (
    <Container ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}>
        <h3>{title}</h3>
        {items?.map((item, index) => (
          <Card
            sx={{
              display: "flex",
              marginY: 2,
              alignItems: "center",
              justifyContent: "space-between",
              height: 80,
              paddingY: 5,
            }}
            key={index}
       
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent
                sx={{ flex: "1 0 auto" }}
                onClick={() => dispatch(increaseCartQuantity(item))}
              >
                {/* <Typography component="div" variant="h7"> */}
                <span onClick={() => fd()} className="text-sm" id={1}>
                  {item.name}
                </span>
                {/* </Typography> */}
                <Typography variant="caption" color="text.dark" component="h2">
                  {formatCurrency(item.price)}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151, height: 80, marginX: 1 }}
              image={`${fromImageToUrl(item.images[0], "/items/images/")}`}
              alt="Live from space album cover"
            />
          </Card>
        ))}
        {/* {children} */}
        <Buttons>
          <button onClick={proceedAndClose}>Proceed</button>
          <button onClick={onClose}>Close</button>
        </Buttons>
      </div>
    </Container>
  );
};

export default DialogModal;
