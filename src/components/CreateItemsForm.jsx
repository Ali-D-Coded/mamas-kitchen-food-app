import { FormControl, Paper, TextField, Box } from "@mui/material";
import React from "react";

const CreateItemsForm = () => {
  return (
    <div className="flex justify-center">
      <Paper sx={{ width: "70%", overflow: "hidden" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          className=""
          noValidate
          autoComplete="off"
        >
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Name" variant="outlined" />
          </FormControl>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Description" variant="outlined" />
          </FormControl>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Category" variant="outlined" />
          </FormControl>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Food Type" variant="outlined" />
          </FormControl>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Price" variant="outlined" />
          </FormControl>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Price" variant="outlined" />
          </FormControl>
        </Box>
      </Paper>
    </div>
  );
};

export default CreateItemsForm;
