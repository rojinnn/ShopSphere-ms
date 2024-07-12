"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";
import Layout from "@/components/transitionlayout";
import TextEditor from "@/components/texteditor";

const ContentManagementPage = () => {
  const [content, setContent] = useState({
    aboutUs:
      "We are a small, family-owned business committed to providing the best products.",
    mission:
      "To deliver high-quality and eco-friendly products to our customers.",
    vision: "To be the leading provider of sustainable goods in the market.",
    contact: "Contact us at: test@example.com or call us at 9840123456.",
  });

  const handleChange = (field) => (value) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Content saved:", content);
  };

  return (
    <Layout>
      <CustomBreadcrumbs
        title={"Content Management"}
        links={[
          {
            path: "/content",
            title: "Content Management",
            active: true,
          },
        ]}
      />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Store Content
        </Typography>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              About Us
            </Typography>
            <TextEditor
              label="About Us"
              value={content.aboutUs}
              handleChange={handleChange("aboutUs")}
            />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Mission
            </Typography>
            <TextEditor
              label="Mission"
              value={content.mission}
              handleChange={handleChange("mission")}
            />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Vision
            </Typography>
            <TextEditor
              label="Vision"
              value={content.vision}
              handleChange={handleChange("vision")}
            />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Contact Information
            </Typography>
            <TextEditor
              label="Contact Information"
              value={content.contact}
              handleChange={handleChange("contact")}
            />
          </CardContent>
        </Card>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </CardActions>
      </Box>
    </Layout>
  );
};

export default ContentManagementPage;
