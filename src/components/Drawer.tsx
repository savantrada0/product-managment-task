import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Button, TextField } from "@mui/material";
import { DrawerProps } from "../types/product";
import { useAppDispatch } from "../redux/store";
import {
  addProduct,
  editProduct,
  getProducts,
} from "../redux/product/productSlice";

const CustomDrawer = ({
  open,
  toggleDrawer,
  values,
  setValues,
  setOpen,
  errors,
  setErrors,
}: DrawerProps) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let valid = true;
    let localerror = {
      name: "",
      description: "",
      quantity: "",
      price: "",
    };
    if (!values.name) {
      localerror.name = "Name is Required";
      valid = false;
    }
    if (!values.description) {
      localerror.description = "Description is Required";
      valid = false;
    }
    if (!values.quantity) {
      localerror.quantity = "Quantity is Required";
      valid = false;
    }
    if (!values.price) {
      localerror.price = "Price is Required";
      valid = false;
    }
    if (!valid) {
      setErrors(localerror);
      return;
    } else {
      setErrors({
        name: "",
        description: "",
        quantity: "",
        price: "",
      });
    }
    if (values.id) {
      dispatch(editProduct(values));
    } else {
      delete values.id;
      dispatch(addProduct(values));
    }
    setValues({
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      id: "",
    });
    setErrors({
      name: "",
      description: "",
      quantity: "",
      price: "",
    });
    setOpen(false);
    dispatch(getProducts());
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer("right", false)}>
      <Box sx={{ width: 400 }} role="presentation">
        <div style={{ margin: "30px" }}>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="string"
            name="name"
            value={values.name}
            onChange={(e: any) => handleChange(e)}
            error={errors.name}
            helperText={errors.name}
          />
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={values.price}
            onChange={(e) => handleChange(e)}
            error={errors.price}
            helperText={errors.price}
          />
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            type="number"
            name="quantity"
            value={values.quantity}
            onChange={(e) => handleChange(e)}
            error={errors.quantity}
            helperText={errors.quantity}
          />
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
            }}
            className="textarea-wrapper"
          >
            <label>Description</label>
            <textarea
              name="description"
              value={values.description}
              onChange={(e) => handleChange(e)}
              cols={30}
              rows={10}
              required
            ></textarea>
            <label style={{ color: "red" }}>
              {errors.description && errors.description}
            </label>
          </div>
          <Button variant="contained" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
