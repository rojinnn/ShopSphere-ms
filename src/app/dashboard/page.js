"use client";
import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "@/components/transitionlayout";
import CustomBreadcrumbs from "@/components/CustomBreadCrumbs";

const DashboardPage = () => {
  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const stats = [
    { label: "Total Sales", value: "Rs.45,00,000" },
    { label: "Total Orders", value: "3,200" },
    { label: "New Customers", value: "1,200" },
  ];

  return (
    <Layout>
      <CustomBreadcrumbs
        title={"Dashboard"}
        links={[
          {
            path: "/dashboard",
            title: "Dashboard",
            active: true,
          },
        ]}
      />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Sales Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Monthly Revenue
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashboardPage;
