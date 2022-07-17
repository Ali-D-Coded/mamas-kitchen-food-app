// import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ItemsTable from "../../../components/ItemsTable";

const Items = () => {
  const navigate = useNavigate()
  const goCreate = () => {
navigate("create-items");
  }
  return (
    <div className="pt-10 px-5">
      <div className="flex justify-between pr-3">
        <Typography variant="h3" component="div" gutterBottom>
          Items
        </Typography>
        <div>
        <Button variant="contained" onClick={goCreate}>Contained</Button>
        </div>
      </div>
      <ItemsTable />
    </div>
  );
};

export default Items;
