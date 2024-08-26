import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import RaiseTicket from "./RaiseTicket";
import BookAppointmentForm from "../BookAppointmentForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MenuIcon from "@mui/icons-material/Menu";

export default function HolidayNav({
  onPress,
  name,
  subName,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const styles = {
    height: "100px",
    width: "130px",
    padding: "10px",
    cursor: "pointer",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#5A51C1", position: "fixed" }}>
        {/* position="static" */}
        <Toolbar>
          <Button
            type="link"
            className="sidebar-toggler"
            sx={{ color: "white", display: { md: "none" } }}
            onClick={() => onPress()}
          >
            {/* <MenuItem sx={{ color: "white" }} /> */}
            <MenuIcon />
          </Button>
          <img
            style={styles}
            className="heroImage"
            src="https://support.saumiccraft.com/wp-content/uploads/2023/05/logo-saumic-new.png"
            alt=""
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
