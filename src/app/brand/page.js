"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

import AddBrandModal from "@/components/AddBrandModal";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const BrandList = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: "Nike", description: "Sportswear and equipment" },
    { id: 2, name: "Apple", description: "Electronics and software" },
    {
      id: 3,
      name: "Sony",
      description: "Consumer and professional electronics",
    },
  ]);

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(value) ||
        brand.description.toLowerCase().includes(value)
    );
    setFilteredBrands(filteredData);
  };

  const handleAddBrand = (newBrand) => {
    setBrands([...brands, { ...newBrand, id: brands.length + 1 }]);
    setIsAddBrandModalOpen(false);
  };

  return (
    <Layout>
      <CustomBreadcrumbs
        title={"Brands"}
        links={[
          {
            path: "/brand",
            title: "Brand",
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
            Featured Brands
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddBrandModalOpen(true)}
        >
          Add Brand
        </Button>
      </Box>
      <Box my={2}>
        <TextField
          label="Search Brands"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchTerm ? filteredBrands : brands}
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
      <AddBrandModal
        open={isAddBrandModalOpen}
        onClose={() => setIsAddBrandModalOpen(false)}
        onAdd={handleAddBrand}
      />
    </Layout>
  );
};

export default BrandList;
