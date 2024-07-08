import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Grid,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddProductModal = ({ open, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    onAdd(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      imageUrl: "",
      category: "",
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
            Add Product
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleAdd}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={newProduct.name}
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
                value={newProduct.description}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={newProduct.quantity}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                variant="outlined"
                size="small"
              >
                {["Clothing", "Home", "Accessories"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              sx={{ ml: 4 }}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
