import React from "react";
import "./SupportUserDashboard.css";
import SupportAdminNav from "../components/layout/SupportAdminNav";
import SupportAdminMenu from "../components/layout/SupportAdminMenu";

const SupportAdminDashboard = () => {

  return (
    <>
      <SupportAdminNav />
      <div className="main">
        <div className="menu">
          <SupportAdminMenu />
        </div>
        <div className="content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              paddingTop: "50px",
              paddingRight: "50px",
            }}
          >
            <img
              src="https://support.saumiccraft.com/wp-content/uploads/2023/05/logo-saumic-new.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportAdminDashboard;
