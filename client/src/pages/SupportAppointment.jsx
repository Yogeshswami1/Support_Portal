import React from "react";
import SupportUserDashboardMenu from "../components/layout/SupportUserDashboardMenu";
import SupportNavbar from "../components/layout/SupportNavbar";
import "./SupportUserDashboard.css";

const SupportAppointment = () => {

  return (
    <>
      <SupportNavbar />
      <div className="main">
        <div className="menu">
          <SupportUserDashboardMenu />
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

export default SupportAppointment;
