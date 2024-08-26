import React, { useId, useState } from "react";
import { Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import { Modal, Form, Input, Select, notification } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const { Option } = Select;

const DashboardButton = ({ userData }) => {
  const [ticketData, setTicketData] = useState(null);

  const handleDashboardClick = async (values) => {
    const userId = userData._id;
    console.log(userId);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/support/dashboard",
        {
          userId: userId,
        }
      );
      console.log("Response:", response.data.allTickets);
      setTicketData(response.data.allTickets);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        startIcon={<DashboardIcon />}
        sx={{
          mb: 2,
          height: "50px",
          width: "200px",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          borderRadius: "30px",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={handleDashboardClick}
      >
        Dashboard {userData.name}
      </Button>
    </>
  );
};

export default DashboardButton;
