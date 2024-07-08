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
import { Box, Typography, TextField, Modal, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";

const OrderPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-001",
      customerName: "Prajwol Bakhati",
      totalAmount: 150.25,
      status: "Pending",
      date: "2024-07-10",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customerName: "Srijan Karki",
      totalAmount: 89.99,
      status: "Confirmed",
      date: "2024-07-09",
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

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

  const handleOpenDetails = (id) => {
    const order = orders.find((order) => order.id === id);
    setSelectedOrder(order);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setOpenDetailsModal(false);
  };

  return (
    <Layout>
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
          onRowClick={(row) => handleOpenDetails(row.id)}
        />
      </div>

      <Modal open={openDetailsModal} onClose={handleCloseDetails}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleCloseDetails} size="small">
              <Close />
            </IconButton>
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Order Details
          </Typography>
          {selectedOrder && (
            <div>
              <Typography variant="body1" gutterBottom>
                Order Number: {selectedOrder.orderNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Customer Name: {selectedOrder.customerName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Amount: ${selectedOrder.totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {selectedOrder.date}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </Layout>
  );
};

export default OrderPage;
