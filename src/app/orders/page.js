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
import { Box, Typography, TextField } from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";

const OrderPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-001",
      customerName: "John Doe",
      totalAmount: 150.25,
      status: "Pending",
      date: "2024-07-10",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      totalAmount: 89.99,
      status: "Confirmed",
      date: "2024-07-09",
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { field: "orderNumber", headerName: "Order Number", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "totalAmount", headerName: "Total Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(value) ||
        order.customerName.toLowerCase().includes(value) ||
        order.status.toLowerCase().includes(value)
    );
    setFilteredOrders(filteredData);
  };

  return (
    <Box p={4}>
      <CustomBreadcrumbs
        title="Orders"
        links={[
          {
            path: "/orders",
            title: "Orders",
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
            Orders List
          </Typography>
        </div>
      </Box>
      <Box my={2}>
        <TextField
          label="Search Orders"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchTerm ? filteredOrders : orders}
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
    </Box>
  );
};

export default OrderPage;
