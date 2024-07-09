import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddCategoryModal = ({ open, onClose, onAdd }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    onAdd(newCategory);
    setNewCategory({
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
            Add Category
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
            onClose();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category Name"
                name="name"
                value={newCategory.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={newCategory.description}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Category
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
