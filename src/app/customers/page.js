"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Prajwol Bakhati",
      email: "prajwol@example.com",
      phone: "1234567890",
      totalOrders: 5,
      lastOrderDate: "2024-07-10",
      address: "123 Main St, City, Country",
      notes: "VIP customer",
    },
    {
      id: 2,
      name: "Srijan Karki",
      email: "srijankarki@example.com",
      phone: "1987654321",
      totalOrders: 3,
      lastOrderDate: "2024-07-09",
      address: "456 Elm St, City, Country",
      notes: "",
    },
  ]);

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "totalOrders", headerName: "Total Orders", width: 150 },
    { field: "lastOrderDate", headerName: "Last Order Date", width: 150 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value) ||
        customer.phone.includes(value)
    );
    setFilteredCustomers(filteredData);
  };

  return (
    <Layout>
      <CustomBreadcrumbs
        title="Customers"
        links={[
          {
            path: "/customers",
            title: "Customers",
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
            Customers List
          </Typography>
        </div>
      </Box>
      <Box my={2}>
        <TextField
          label="Search Customers"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchTerm ? filteredCustomers : customers}
          columns={columns}
          pageSize={5}
          pagination
          rowsPerPageOptions={[5, 10, 20]}
          sortingOrder={["asc", "desc"]}
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
    </Layout>
  );
};

export default CustomersPage;
