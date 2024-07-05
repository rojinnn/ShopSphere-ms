import Head from "next/head";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import styled from "styled-components";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import moment from "moment";
import { useMutation } from "react-query";
import { setUser } from "@/store/reducers/userSlice";
import { useDispatch } from "react-redux";

const login = async ({ username, password }) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: { email: username, password },
  });
  return res.data;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("stamp", moment().toISOString());
      dispatch(setUser(data));
      toast.success("Logged In Successfully");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message || "Failed to login");
    },
  });

  const handleLogin = () => {
    if (username && password) {
      setLoading(true);
      mutation.mutate({ username, password });
    } else {
      toast.error("Username and password are required");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Page>
      <Head>
        <title>ShopSphere CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <StyledLoginContainer
            initial={{ opacity: 0.75, translateX: -80, scale: 1 }}
            animate={{ opacity: 1, translateX: 10, scale: 1 }}
            exit={{ opacity: 0, translateX: -24 }}
            transition={{ duration: 0.5 }}
          >
            <div className="login-form-wrap">
              <StyledHeader>Login</StyledHeader>
              <StyledSubHeader>
                Enter your username and password to login
              </StyledSubHeader>

              <TextField
                label="Username"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                fullWidth
                variant="outlined"
                margin="normal"
              />

              <TextField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                fullWidth
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={loading}
                  onClick={handleLogin}
                >
                  {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
              </Grid>
            </div>
          </StyledLoginContainer>
        </Grid>
      </MainContainer>
    </Page>
  );
};

export default Login;

const Page = styled.div`
  background-color: #f5f5f5;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const StyledLoginContainer = styled(motion.div)`
  background-color: rgba(255, 127, 80, 0.25);
  padding: 24px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-top: 100px;
    background-color: rgba(255, 127, 80, 0.4);
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
`;

const StyledHeader = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  color: "red";
`;

const StyledSubHeader = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: "purple";
  margin-bottom: 20px;
`;
