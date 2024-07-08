"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <StarIcon color="primary" />
            <Typography variant="body1" ml={0.5}>
              {product.rating}
            </Typography>
            <Typography variant="h6" ml={18}>
              ${product.price}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://picsum.photos/id/110/200/300",
      name: "Organic Cotton T-Shirt",
      description: "Soft and sustainable cotton tee",
      price: 29.99,
      category: "Clothing",
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://picsum.photos/id/999/200/300",
      name: "Bamboo Cutting Board",
      description: "Durable kitchen essential",
      price: 19.99,
      category: "Home",
      rating: 4.2,
    },
    {
      id: 3,
      image: "https://picsum.photos/id/26/200/300",
      name: "Handcrafted Ceramic Mug",
      description: "Unique and artisanal coffee mug",
      price: 14.99,
      category: "Home",
      rating: 4.8,
    },
    {
      id: 4,
      image: "https://picsum.photos/id/266/200/300",
      name: "Reusable Silicone Straws",
      description: "Eco-friendly and durable straws",
      price: 9.99,
      category: "Accessories",
      rating: 4.3,
    },
    {
      id: 5,
      image: "https://picsum.photos/id/206/200/300",
      name: "Organic Cotton Throw Pillow",
      description: "Soft and cozy home decor",
      price: 24.99,
      category: "Home",
      rating: 4.6,
    },
    {
      id: 6,
      image: "https://picsum.photos/id/121/200/300",
      name: "Handmade Leather Wallet",
      description: "Durable and stylish everyday accessory",
      price: 39.99,
      category: "Accessories",
      rating: 4.7,
    },
  ]);

  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 100 },
    availability: false,
  });

  // Function to update filters
  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Function to filter products based on current filters
  const filteredProducts = products.filter((product) => {
    const meetsCategoryFilter =
      !filters.category || product.category === filters.category;
    const meetsPriceRangeFilter =
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max;
    const meetsAvailabilityFilter = !filters.availability || product.available;

    return (
      meetsCategoryFilter && meetsPriceRangeFilter && meetsAvailabilityFilter
    );
  });

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Featured Products
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Discover our curated selection of high-quality products.
        </Typography>
      </Box>

      {/* Filter panel */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <Select
              value={filters.category}
              onChange={(e) =>
                handleFiltersChange({ category: e.target.value })
              }
              fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography id="price-range-slider" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={[filters.priceRange.min, filters.priceRange.max]}
              onChange={(e, newValue) =>
                handleFiltersChange({
                  priceRange: { min: newValue[0], max: newValue[1] },
                })
              }
              valueLabelDisplay="auto"
              min={0}
              max={100}
              aria-labelledby="price-range-slider"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.availability}
                  onChange={(e) =>
                    handleFiltersChange({ availability: e.target.checked })
                  }
                />
              }
              label="Available Only"
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} lg={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
