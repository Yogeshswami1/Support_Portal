import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Snackbar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import RaiseTicket from "./RaiseTicket";
import MenuIcon from "@mui/icons-material/Menu";

const SupportNavbar = ({
  onPress,
  name,
  subName,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleButtonClick = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/support/click", {
        userId: id,
      });
      setMessage(res.data.msg);
      history.push("/supportuserbookappointment");
    } catch (err) {
      setMessage(err.response.data.msg || "Server Error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const styles = {
    height: "100px",
    width: "130px",
    padding: "10px",
    cursor: "pointer",
  };
  const handleBrandClick = () => {
    history.push("/supportuserdashboard");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#5A51C1", position: "fixed" }}>
        <Toolbar>
          <Button
            type="link"
            className="sidebar-toggler"
            sx={{ color: "white", display: { md: "none" } }}
            onClick={() => onPress()}
          >
            <MenuIcon />
          </Button>
          <img
            style={styles}
            onClick={handleBrandClick}
            className="heroImage"
            src="https://support.saumiccraft.com/wp-content/uploads/2023/05/logo-saumic-new.png"
            alt="logo"
          />
          {!token ? (
            <RaiseTicket />
          ) : (
            <Button
              onClick={handleButtonClick}
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "20px",
                fontWeight: "bold",
                padding: "8px 15px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                position: "absolute",
                right: "30px",
              }}
            >
              Book Appointment
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Snackbar for notification */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default SupportNavbar;
