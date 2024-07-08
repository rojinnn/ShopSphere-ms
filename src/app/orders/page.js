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
import { Box, Typography, Button } from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const router = useRouter();
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

  const columns = [
    { field: "orderNumber", headerName: "Order Number", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "totalAmount", headerName: "Total Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/orders/add")}
        >
          Add Order
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
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
    </Box>
  );
};

export default OrderPage;