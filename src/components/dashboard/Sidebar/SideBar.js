"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import styled from "styled-components";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import { Category } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

// Define the Wrapper styled component
const Wrapper = styled.div`
  .sideBar {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    background-color: #20232a; /* Dark background */
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #f0f0f0;
  }

  .sideBar::-webkit-scrollbar {
    width: 8px;
  }

  .sideBar::-webkit-scrollbar-track {
    background: #20232a; /* Same as background color */
  }

  .sideBar::-webkit-scrollbar-thumb {
    background-color: #61dafb; /* Scrollbar color */
    border-radius: 5px;
  }
  .sideBar::-webkit-scrollbar-thumb:hover {
    background-color: #4caf50; /* Hover color */
  }

  .user {
    display: flex;
    height: 50px;
    align-items: center;
    background-color: #282c34; /* User section background */
    border-bottom: 1px solid #333;
    justify-content: ${({ isCollapsed }) =>
      isCollapsed ? "center" : "space-between"};
  }

  .userDetail {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-start;
    justify-content: center;
    padding-left: 8px;
  }

  .username {
    margin-left: 8px;
    font-weight: 800;
    font-size: 18px;
    color: #ffffff;
  }

  .userTitle {
    font-size: 12px;
    color: #6c757d;
  }

  .items {
    flex-grow: 1;
    padding: 10px;
  }

  .item-container {
    padding: 15px 10px;
    margin: 5px 0;
    border-radius: 8px;
    transition: background-color 0.3s;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #ffffff;
    &:hover {
      background-color: #2b4864;
    }
    &.active {
      background-color: #143453;
      color: #ffffff;
    }
    .icon {
      color: inherit;
    }
  }

  .toggleButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: ${({ isCollapsed }) => (isCollapsed ? "0" : "auto")};
  }

  .menuIcon {
    color: #ffffff;
  }

  .branding {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "20px")};
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
  }
`;

const SideBar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed); // Notify the parent component about the change
  };

  const ITEMS = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <MdDashboard size={24} className="icon" />,
    },
    {
      title: "Products",
      link: "/product",
      icon: (
        <ShoppingCartIcon
          size={24}
          className="icon"
          style={{ color: "Green" }}
        />
      ),
      //   icon: <RiPagesLine size={24} className="icon" />,
    },
    {
      title: "Categories",
      link: "/category",
      icon: <Category size={24} className="icon" style={{ color: "Yellow" }} />,
    },
    {
      title: "Orders",
      link: "/orders",
      icon: (
        <ReceiptIcon size={24} className="icon" style={{ color: "Yellow" }} />
      ),
    },
    {
      title: "Customers",
      link: "/customers",
      icon: <PersonIcon size={24} className="icon" />,
    },
    {
      title: "Promotions",
      link: "/promotions",
      icon: (
        <LocalOfferIcon size={24} className="icon" style={{ color: "red" }} />
      ),
    },
    {
      title: "Content Management",
      link: "/content",
      icon: (
        <DescriptionIcon
          size={24}
          className="icon"
          style={{ color: "Green" }}
        />
      ),
    },
    {
      title: "Notification",
      link: "/notification",
      icon: (
        <NotificationsIcon
          size={24}
          className="icon"
          style={{ color: "Yellow" }}
        />
      ),
    },
    {
      title: "Support",
      link: "/support",
      icon: <HelpIcon size={24} className="icon" style={{ color: "Yellow" }} />,
    },
  ];

  return (
    <Wrapper isCollapsed={isCollapsed}>
      <Drawer
        variant="permanent"
        open={!isCollapsed}
        PaperProps={{
          style: {
            backgroundColor: "#20232a",
            color: "#ffffff",
            width: isCollapsed ? "60px" : "300px",
            transition: "width 0.3s ease-in-out",
          },
        }}
      >
        <div className="sideBar">
          <div className="user" isCollapsed={isCollapsed}>
            {!isCollapsed && (
              <>
                <div className="userDetail">
                  <span className="branding">ShopSphere</span>
                </div>
              </>
            )}
            <IconButton className="toggleButton" onClick={toggleSidebar}>
              {isCollapsed ? (
                <GiHamburgerMenu className="menuIcon" />
              ) : (
                <GiHamburgerMenu className="menuIcon" />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className="items">
            {ITEMS.map((item) => (
              <ListItem
                key={item.link}
                component={Link}
                href={item.link}
                className={
                  pathname === item.link
                    ? "item-container active"
                    : "item-container"
                }
              >
                <ListItemIcon className="icon" style={{ minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.title} />}
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Wrapper>
  );
};

export default SideBar;
