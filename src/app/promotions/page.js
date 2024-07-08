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
import { Box, Typography, TextField, Modal } from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";

const PromotionPage = () => {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      promotionCode: "Summer Sale",
      description: "Get 20% off on all summer collections.",
      discountPercentage: 20,
      startDate: "2024-07-15",
      endDate: "2024-08-15",
      status: "Active",
    },
    {
      id: 2,
      promotionCode: "Back to School",
      description: "Special discounts on school supplies.",
      discountPercentage: 15,
      startDate: "2024-08-01",
      endDate: "2024-08-31",
      status: "Inactive",
    },
    {
      id: 3,
      promotionCode: "SUMMER50",
      discountPercentage: 50,
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      status: "Active",
    },
    {
      id: 4,
      promotionCode: "FALL25",
      discountPercentage: 25,
      startDate: "2024-09-01",
      endDate: "2024-09-30",
      status: "Pending",
    },
  ]);

  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const columns = [
    { field: "promotionCode", headerName: "Promotion Code", width: 150 },
    { field: "discountPercentage", headerName: "Discount (%)", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = promotions.filter(
      (promotion) =>
        promotion.promotionCode.toLowerCase().includes(value) ||
        promotion.status.toLowerCase().includes(value)
    );
    setFilteredPromotions(filteredData);
  };

  const handleOpenDetails = (id) => {
    const promotion = promotions.find((promotion) => promotion.id === id);
    setSelectedPromotion(promotion);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setSelectedPromotion(null);
    setOpenDetailsModal(false);
  };

  return (
    <Layout>
      <CustomBreadcrumbs
        title="Promotions"
        links={[
          {
            path: "/promotions",
            title: "Promotions",
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
            Promotions List
          </Typography>
        </div>
      </Box>
      <Box my={2}>
        <TextField
          label="Search Promotions"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchTerm ? filteredPromotions : promotions}
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
          <Typography variant="h4" gutterBottom>
            Promotion Details
          </Typography>
          {selectedPromotion && (
            <div>
              <Typography variant="body1" gutterBottom>
                Promotion Code: {selectedPromotion.promotionCode}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Discount Percentage: {selectedPromotion.discountPercentage}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                Start Date: {selectedPromotion.startDate}
              </Typography>
              <Typography variant="body1" gutterBottom>
                End Date: {selectedPromotion.endDate}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: {selectedPromotion.status}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </Layout>
  );
};

export default PromotionPage;
