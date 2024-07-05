import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/reducers/userSlice";
import { useEffect } from "react";
// import SideBar from "./dashboard/SideBar/SideBar";
// import Navbar from "./dashboard/NavBar/Navbar";
import { useRouter } from "next/navigation";
// import InnerLayout from "./InnerLayout";
import Login from "./login";

const GateWay = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      dispatch(setUser(JSON.parse(auth)));
    } else {
      router.push("/");
    }
  }, []);
  // console.log(user, "check abc");
  return <Login />;
};

export default GateWay;
