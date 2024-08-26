import React, { useState } from "react";
import "./SupportUserDashboard.css";
import UserLayout from "../components/layout/UserLayout";

const SupportUserDashboard = () => {
  return (
    <UserLayout>
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
    </UserLayout>
  );
};

export default SupportUserDashboard;
