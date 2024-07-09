"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";
import AddCategoryModal from "@/components/AddCategoryModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Clothing", description: "Apparel and garments" },
    { id: 2, name: "Home", description: "Home essentials and decor" },
    { id: 3, name: "Accessories", description: "Fashion accessories" },
  ]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value) ||
        category.description.toLowerCase().includes(value)
    );
    setFilteredCategories(filteredData);
  };

  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: prevCategories.length + 1, ...newCategory },
    ]);
  };

  const handleOpenAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleCloseAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  return (
    <Layout>
      <CustomBreadcrumbs
        title={"Categories"}
        links={[
          {
            path: "/category",
            title: "Category",
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
            Categories
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddCategoryModal}
        >
          Add Category
        </Button>
      </Box>
      <Box my={2}>
        <TextField
          label="Search Categories"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchTerm ? filteredCategories : categories}
          columns={columns}
          pageSize={5}
          pagination
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
      <AddCategoryModal
        open={isAddCategoryModalOpen}
        onClose={handleCloseAddCategoryModal}
        onAdd={handleAddCategory}
      />
    </Layout>
  );
};

export default CategoryList;
