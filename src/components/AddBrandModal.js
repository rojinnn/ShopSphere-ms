import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddBrandModal = ({ open, onClose, onAdd }) => {
  const [newBrand, setNewBrand] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBrand((prevBrand) => ({
      ...prevBrand,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    onAdd(newBrand);
    setNewBrand({
      name: "",
      description: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxWidth: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Add Brand
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleAdd}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newBrand.name}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newBrand.description}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ my: 2 }}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Add Brand
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddBrandModal;
