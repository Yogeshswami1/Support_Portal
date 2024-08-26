import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SupportManagerLogin from "./SupportManagerLogin";

export default function SupportMngrNavbar() {
  const token = localStorage.getItem("token");
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
          <img
            style={styles}
            className="heroImage"
            src="https://support.saumiccraft.com/wp-content/uploads/2023/05/logo-saumic-new.png"
            alt=""
          />
          {!token && <SupportManagerLogin />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
