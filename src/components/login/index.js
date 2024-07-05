import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import Link from "next/link";
// import { AircraftImage } from "../assets";
// import Text from "../Text";
// import Button from "../Button";

import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";

import styled from "styled-components";
import { useRouter } from "next/router";
import { BeatLoader, ClipLoader } from "react-spinners";
// import { useDispatch, useSelector } from "react-redux";
// import { getResetLink, login as loginApi } from "../../RESTAPIs/users";
import moment from "moment";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { setUser } from "@/store/reducers/userSlice";
import { Provider, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation } from "react-query";

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
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetLinkEmail, setResetLinkEmail] = useState("");
  const [keepSignedIn, setKeepmeSignedIn] = useState("");

  const dispatch = useDispatch();

  const handleChangeKeepSignedIn = (e) => {
    if (keepSignedIn === "yes") {
      setKeepmeSignedIn("no");
    }
    if (keepSignedIn !== "yes") {
      setKeepmeSignedIn("yes");
    }
  };

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("stamp", moment().toISOString());
      Cookies.set("authToken", data.token);
      dispatch(setUser(data));
      toast("Logged In Successfully", {
        autoClose: 5000,
      });
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      toast("Invalid email or password", {
        autoClose: 5000,
      });
    },
  });
  const handleSubmit = (e) => {
    setLoading(true);
    mutation.mutate({ username, password });
  };
  // const handleSubmit = async (e) => {
  //   setLoading(true);
  //   try {
  //     const res = await axios({
  //       method: "POST",
  //       baseURL: process.env.NEXT_PUBLIC_API_URL,
  //       url: "auth/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: { username, password },
  //     });

  //     if (!!res.data.result) {
  //     }
  //     localStorage.setItem("auth", JSON.stringify(res.data));
  //     localStorage.setItem("accessToken", res.data.token);
  //     localStorage.setItem("stamp", moment().toISOString());
  //     Cookies.set("authToken", res.data.token);
  //     setLoading(false);
  //     dispatch(setUser(res.data));
  //     toast("Logged In Successfully", {
  //       autoClose: 5000,
  //       // position: toast?.POSITION?.TOP_RIGHT,
  //     });
  //   } catch (err) {
  //     setLoading(false);
  //     toast("Invalid email or password", {
  //       autoClose: 5000,
  //       // position: toast?.POSITION?.TOP_RIGHT,
  //     });
  //     // console.log(err, "check err");
  //   }
  // };

  const passwordRef = useRef(null);
  const handlePressEnter = (input) => (e) => {
    if (e.code === "Enter") {
      if (input === "username") {
        passwordRef?.current?.focus();
      }
      if (input === "password") {
        handleSubmit(e);
      }
    }
  };
  return (
    <Page className="container">
      <Head>
        <title>Ducks Tattoo CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        {/* <Grid container> */}
        {/* <motion.div
          className="aircraft-img-container"
          initial={{ opacity: 0.75, translateX: 80, scale: 1 }}
          animate={{ opacity: 1, translateX: -10, scale: 1 }}
          exit={{ opacity: 0, translateX: 24 }}
          transition={{ duration: 0.5 }}>
          <div className="logo">
            <img src="/duckstattooLogo.png" alt="logo" width={300} />
          </div>
        </motion.div> */}
        <Grid
          item
          container
          direction="column"
          className="field-container login-container"
        >
          <LoginContainer
            initial={{ opacity: 0.75, translateX: -80, scale: 1 }}
            animate={{ opacity: 1, translateX: 10, scale: 1 }}
            exit={{ opacity: 0, translateX: -24 }}
            transition={{ duration: 0.5 }}
          >
            <div className="login-form-wrap">
              <div className="mb-30">
                <StyledHeader>Login</StyledHeader>
                <StyledSubHeader>
                  Enter your username and password to login
                </StyledSubHeader>
              </div>
              <TextField
                label="Username"
                placeholder="eg. example@mail.com"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handlePressEnter("username")}
                value={username}
                style={{
                  width: "100%",
                  marginBottom: 20,
                }}
              />
              <TextField
                label="Password"
                placeholder="Enter your password"
                type={!!show ? "text" : "password"}
                inputRef={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePressEnter("password")}
                value={password}
                style={{
                  width: "100%",
                  marginBottom: 20,
                }}
                InputProps={{
                  endAdornment: !!show ? (
                    <VisibilityOffIcon
                      onClick={() => {
                        setShow(false);
                      }}
                      size={12}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityIcon
                      size={12}
                      onClick={() => {
                        setShow(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  ),
                }}
              />

              <Grid item md={12}>
                <Button
                  role="button"
                  className="btn primary"
                  width="100%"
                  disabled={loading}
                  variant="contained"
                  onClick={handleSubmit}
                  style={{
                    width: "100%",
                  }}
                >
                  {loading ? (
                    <BeatLoader color={"#1336f0"} speedMultiplier={0.5} />
                  ) : (
                    "Login"
                  )}
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                  // onClick={() => handleSubmit}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>

              {/* <InfoContainer
                className="mt-30"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <Box style={{ alignItems: "center", gap: "5px" }}>
                  <MdOutlineMailOutline color="var(--gray-800)" size={24} />
                </Box>
                <Box style={{ alignItems: "center", gap: "5px" }}>
                  <HiOutlinePhone color="var(--gray-800)" size={24} />
                </Box>
              </InfoContainer> */}
            </div>
          </LoginContainer>
        </Grid>
      </MainContainer>
    </Page>
  );
}

// const Box = styled.div`
//   margin-top: ${(props) => props.mTop || 0}px;
//   margin-bottom: ${(props) => props.mBot || 0}px;
//   margin-left: ${(props) => props.mLeft || 0}px;
//   margin-right: ${(props) => props.mRight || 0}px;
//   display: flex;
// `;

const Page = styled.div`
  background-color: #f5f5f5;
  /* background-color: antiquewhite; */
  width: 100%;
  .login-form-wrap {
    width: 100%;
    max-width: 420px;
  }
  .login-container {
    width: 100%;
    height: 100vh;
    display: flex;
  }
`;
const MainContainer = styled.div`
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px;
  margin-top: 20px;
  /* background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 40px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px); */
  /* margin: 0 auto; */
  /* height: auto; */
  height: 90vh;

  @media (max-width: 768px) {
    width: 90%;
    margin: 20px;
    margin-top: 30px;
    flex-direction: column;
    padding: 20px;
  }

  .logo {
    /* margin-left: 300px; */
    /* margin-top: 90px; */
    @media (max-width: 768px) {
      width: 400px;
      height: 20px;
    }
  }

  .aircraft-img-container {
    /* width: 50%; */
    /* padding: 50px 0 50px 50px; */
    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }

  .aircraft {
    /* object-fit: cover; */
    // border-radius: 8px;
    /* width: 100%; */
    /* height: calc(100vh); */
    // height: calc(100vh - 100px);
  }
`;

const LoginContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  height: 100vh;
  position: relative;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
  }

  .login-form-wrap {
    background-color: #ffffff;
    padding: 24px;
    border-radius: 15px;
    box-shadow: 20px 20px 50px 10px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 40px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    @media (max-width: 768px) {
      margin-top: 100px;
      background-color: rgba(255, 255, 255, 0.75);
      box-shadow: 0px 20px 50px 10px rgba(0, 0, 0, 0.5);
    }
  }
  .keepLogin span {
    padding: 0;
    margin-right: 8px;
  }
`;
const InfoContainer = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // max-width: 410px;
  // width: 100%;
  // padding-bottom: 24px;
  // position: absolute;
  // bottom: 0px;
`;

const StyledHeader = styled.h1`
  font-family: "Roboto" !important;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 52px;
  text-align: center;
  color: #000000;
`;
const StyledSubHeader = styled.p`
  // font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #4c4c4c;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    color: #000000;
  }
`;
