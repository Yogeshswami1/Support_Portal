import React from "react";
import SupportUserDashboardMenu from "../components/layout/SupportUserDashboardMenu";
import SupportNavbar from "../components/layout/SupportNavbar";
import "./SupportUserDashboard.css";
import BookAppointment from "../components/layout/BookAppointment";

const BookUserAppointment = () => {
  // useEffect(() => {
  //   setUserData(location.state);
  //   setTicketData(location.state);
  // }, [location.state]);

  return (
    <>
      <SupportNavbar />
      <div className="main">
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
            <BookAppointment />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookUserAppointment;
