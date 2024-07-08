"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";

const AddProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productCategory, setProductCategory] = useState("");

  const handleSaveProduct = () => {
    console.log({
      productName,
      productDescription,
      productImage,
      productPrice,
      productQuantity,
      productCategory,
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CustomBreadcrumbs
        title={"Add New Product"}
        links={[
          {
            path: "/product",
            title: "Product",
          },
          {
            path: "/product/add",
            title: "Add Product",
            active: true,
          },
        ]}
      />
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>

        <Box my={4}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Product Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            style={{ marginTop: 20 }}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <TextField
            label="Product Image URL"
            variant="outlined"
            fullWidth
            style={{ marginTop: 20 }}
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
          <TextField
            label="Product Price"
            type="number"
            variant="outlined"
            fullWidth
            style={{ marginTop: 20 }}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <TextField
            label="Product Quantity"
            type="number"
            variant="outlined"
            fullWidth
            style={{ marginTop: 20 }}
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" style={{ marginTop: 20 }}>
            <InputLabel id="product-category-label">
              Product Category
            </InputLabel>
            <Select
              labelId="product-category-label"
              id="product-category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              label="Product Category"
            >
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProduct}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddProductPage;
