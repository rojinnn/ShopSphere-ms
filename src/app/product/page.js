"use client";
import { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://picsum.photos/id/110/200/300",
      name: "Organic Cotton T-Shirt",
      description: "Soft and sustainable cotton tee",
      price: 29.99,
      category: "Clothing",
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://picsum.photos/id/999/200/300",
      name: "Bamboo Cutting Board",
      description: "Durable kitchen essential",
      price: 19.99,
      category: "Home",
      rating: 4.2,
    },
    {
      id: 3,
      image: "https://picsum.photos/id/26/200/300",
      name: "Handcrafted Ceramic Mug",
      description: "Unique and artisanal coffee mug",
      price: 14.99,
      category: "Home",
      rating: 4.8,
    },
    {
      id: 4,
      image: "https://picsum.photos/id/266/200/300",
      name: "Reusable Silicone Straws",
      description: "Eco-friendly and durable straws",
      price: 9.99,
      category: "Accessories",
      rating: 4.3,
    },
    {
      id: 5,
      image: "https://picsum.photos/id/206/200/300",
      name: "Organic Cotton Throw Pillow",
      description: "Soft and cozy home decor",
      price: 24.99,
      category: "Home",
      rating: 4.6,
    },
    {
      id: 6,
      image: "https://picsum.photos/id/121/200/300",
      name: "Handmade Leather Wallet",
      description: "Durable and stylish everyday accessory",
      price: 39.99,
      category: "Accessories",
      rating: 4.7,
    },
  ]);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "rating", headerName: "Rating", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "category", headerName: "Category", width: 150 },
  ];

  const handleAddProduct = () => {
    // Implement your logic to add a product
    // This function can open a modal, navigate to a new page, etc.
    console.log("Add Product clicked");
  };

  return (
    <div>
      <CustomBreadcrumbs
        title={"Products"}
        links={[
          {
            path: "/product",
            title: "Product",
            active: true,
          },
        ]}
      />
      <Box
        my={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Featured Products
          </Typography>
        </div>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
              </GridToolbarContainer>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ProductList;
