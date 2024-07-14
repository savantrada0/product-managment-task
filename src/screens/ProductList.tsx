import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector, useAppDispatch, RootState } from "../redux/store";
import { Button, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomDrawer from "../components/Drawer";
import { getProducts, deleteProduct } from "../redux/product/productSlice";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const rows = useAppSelector((state: RootState) => state.products.products);
  const [values, setValues] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    id: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "name",
      headerName: "Product Name",
      editable: true,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "any",
      headerName: "Actions",
      type: "string",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                onEditClick(params);
              }}
              style={{ marginRight: "10px" }}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => onDeleteClick(params)}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: 200,
    },
  ];

  const onEditClick = (params: any) => {
    console.log("called");
    const currentVal = {
      name: params.row.name,
      description: params.row.description,
      quantity: params.row.quantity,
      price: params.row.quantity,
      id: params.row.id,
    };
    setValues(currentVal);
    setOpen(true);
  };

  const onDeleteClick = async (params: any) => {
    console.log(params.row.id);
    await dispatch(deleteProduct({ id: params.row.id }));
    await dispatch(getProducts());
  };

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      if (open === false) {
        setValues({
          name: "",
          description: "",
          quantity: "",
          price: "",
          id: "",
        });
        setErrors({
          name: "",
          description: "",
          quantity: "",
          price: "",
        });
      }
      setOpen(open);
    };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Products
            </Typography>
            <Button
              onClick={toggleDrawer("right", true)}
              color="inherit"
              variant="outlined"
            >
              Add Product
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <CustomDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        values={values}
        setValues={setValues}
        setOpen={setOpen}
        errors={errors}
        setErrors={setErrors}
      />
      <div style={{ margin: "0px 260px" }}>
        <Box sx={{ height: 631, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default ProductList;
