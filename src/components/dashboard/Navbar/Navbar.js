"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOut, setUser } from "@/store/reducers/userSlice";
import { GridMenuIcon } from "@mui/x-data-grid";
import MobileSideBar from "../MobileSidebar/MobileSidebar";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const updateView = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const handleLogOut = (e) => {
    router.push("/");
    localStorage.removeItem("auth");
    localStorage.removeItem("accessToken");
    dispatch(logOut(null));
  };

  const [display, setDisplay] = useState(false);
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      {isMobileView && (
        <div className={styles.menuTitle} onClick={toggleSidebarCollapse}>
          <GridMenuIcon className={styles.icons} />
        </div>
      )}
      <div className={styles.title}></div>
      <div className={styles.menu}>
        <div className={styles.search}></div>
        <div className={styles.icons}>
          <MdOutlineChat size={32} style={{ cursor: "pointer" }} />
          <FaUser
            size={32}
            style={{ cursor: "pointer" }}
            onClick={() => setDisplay(!display)}
          />
        </div>
        {display && (
          <div className={styles.divider}>
            <p>Welcome user</p>
            <div className={styles.icon1}>
              <MdPublic size={15} />
              <p>Profile</p>
            </div>

            <p onClick={handleLogOut} className={styles.icon2}>
              Sign Out
            </p>
          </div>
        )}
      </div>
      {isSidebarCollapsed && <MobileSideBar onToggle={toggleSidebarCollapse} />}
    </div>
  );
};

export default Navbar;
