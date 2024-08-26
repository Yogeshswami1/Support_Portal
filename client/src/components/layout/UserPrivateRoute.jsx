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

const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role);

  if (!token || role !== "user") {
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
        token && role === "user" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/support" />
        )
      }
    />
  );
};

export default UserPrivateRoute;
