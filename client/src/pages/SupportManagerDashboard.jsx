import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import SupportMngrNavbar from "../components/layout/SupportMngrNavbar";
import "./SupportUserDashboard.css";
import SupportManagerMenu from "../components/layout/SupportManagerMenu";

const SupportManagerDashboard = () => {
  const [managerData, setManagerData] = useState({});
  const location = useLocation();
  
  const getRowStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "RGB(248,222,126)" };
      case "Open":
        return { backgroundColor: "rgb(41,171,135)", color: "white" };
      case "Closed":
        return { backgroundColor: "#F88379", color: "white" };
      default:
        return {};
    }
  };

  const handleRowClick = (id) => {
    // Replace with your desired action, such as navigating to a different page
    window.location.href = `#${id}`;
  };

  useEffect(() => {
    setManagerData(location.state);
  }, [location.state]);
  return (
    <>
      <SupportMngrNavbar />
      <div className="main">
        <div className="menu">
          <SupportManagerMenu managerData={managerData} />
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
          {/* <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Subject</th>
                <th>Managers</th>
                <th>Date Created</th>
                <th>Date Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr onClick={() => handleRowClick(row.id)}>
                  <td>{row.id}</td>
                  <td key={row.id} style={getRowStyle(row.status)}>
                    {row.status}
                  </td>
                  <td>{row.subject}</td>
                  <td>{row.managers}</td>
                  <td>{row.dateCreated}</td>
                  <td>{row.dateUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  );
};

export default SupportManagerDashboard;
