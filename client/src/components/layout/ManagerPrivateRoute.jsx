import React from "react";
import { Route, Redirect } from "react-router-dom";
import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
    style: { marginTop: 120 },
  });
};

const ManagerPrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "manager") {
    openNotificationWithIcon(
      "error",
      "Access Denied",
      "Please log in to access this page."
    );
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        token && role === "manager" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/supportmanager" />
        )
      }
    />
  );
};

export default ManagerPrivateRoute;
