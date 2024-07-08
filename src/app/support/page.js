"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Modal,
  Button,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";
import CloseIcon from "@mui/icons-material/Close";

const SupportPage = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Issue with account login",
      status: "Open",
      description: "Cannot login to my account.",
    },
    {
      id: 2,
      subject: "Payment not processed",
      status: "Closed",
      description: "Payment was declined on multiple attempts.",
    },
    {
      id: 3,
      subject: "Product delivery delay",
      status: "Open",
      description: "Ordered product hasn't arrived yet.",
    },
  ]);

  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const columns = [
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = tickets.filter(
      (ticket) =>
        ticket.subject.toLowerCase().includes(value) ||
        ticket.status.toLowerCase().includes(value) ||
        ticket.description.toLowerCase().includes(value)
    );
    setFilteredTickets(filteredData);
  };

  const handleOpenDetails = (id) => {
    const ticket = tickets.find((ticket) => ticket.id === id);
    setSelectedTicket(ticket);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setSelectedTicket(null);
    setOpenDetailsModal(false);
  };

  const handleMarkResolved = () => {
    if (selectedTicket) {
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? { ...ticket, status: "Closed" }
          : ticket
      );
      setTickets(updatedTickets);
      setSelectedTicket({ ...selectedTicket, status: "Closed" });
    }
  };

  return (
    <Layout>
      <CustomBreadcrumbs
        title="Support"
        links={[
          {
            path: "/support",
            title: "Support",
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
          <Typography variant="h4" gutterBottom>
            Support Tickets
          </Typography>
        </div>
      </Box>
      <Box my={2}>
        <TextField
          label="Search Tickets"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchTerm ? filteredTickets : tickets}
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
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={handleCloseDetails}
              style={{ position: "absolute", top: 5, right: 5 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" gutterBottom>
            Ticket Details
          </Typography>
          {selectedTicket && (
            <div>
              <Typography variant="body1" gutterBottom>
                Subject: {selectedTicket.subject}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: {selectedTicket.status}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {selectedTicket.description}
              </Typography>
            </div>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleMarkResolved}
              disabled={selectedTicket?.status === "Closed"}
            >
              Mark Resolved
            </Button>
          </Box>
        </Box>
      </Modal>
    </Layout>
  );
};

export default SupportPage;
