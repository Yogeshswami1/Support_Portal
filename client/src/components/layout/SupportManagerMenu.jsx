import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Form, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const { Item } = Form;

const SupportManagerMenu = ({ managerData }) => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const getPlatform = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/support/get-platform",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPlatforms(response.data);
      } catch (err) {
        console.log("Error fetching platforms:", err);
      }
    };

    getPlatform();
  }, []);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAppointmentClick = () => {
    history.push("/supportmanagerappointment");
  };

  const handleOpenTicketClick = () => {
    history.push("/supportmanageropenticket");
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    openNotificationWithIcon("success", "Success", "Logged out successfully.");
    history.push("supportmanager");
  };

  const dropDownStyle = {
    width: 470,
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleDashboarClick = () => {
    history.push("/supportmanagerdash");
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/api/support/create-user", values)
          .then((response) => {
            console.log("Success:", response.data);
            // dispatch(addUser(response.data));
            handleCancel();
            openNotificationWithIcon(
              "success",
              "User created",
              "New user has been created successfully."
            );
          })
          .catch((error) => {
            console.error("Error:", error);
            openNotificationWithIcon(
              "error",
              "Failed",
              "There is an problem creating new user. Please try again."
            );
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 5,
        bgcolor: "background.paper",
        borderRadius: 5,
        maxWidth: 300,
        m: "auto",
        textAlign: "center",
        position: "absolute",
        left: 2,
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "x-large",
        }}
      >
        Welcome Back {localStorage.getItem("name")}
      </h1>
      <Button
        variant="contained"
        startIcon={<DashboardIcon />}
        sx={{
          mb: 2,
          height: "50px",
          width: "200px",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          borderRadius: "30px",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={handleDashboarClick}
      >
        Dashboard
      </Button>

      <Button
        variant="contained"
        startIcon={<UpcomingIcon />}
        sx={{
          mb: 2,
          height: "50px",
          width: "200px",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          borderRadius: "30px",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={handleAppointmentClick}
      >
        Appointments
      </Button>

      <Button
        variant="contained"
        startIcon={<PersonAddIcon />}
        sx={{
          mb: 2,
          height: "50px",
          width: "200px",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          borderRadius: "30px",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={showModal}
      >
        Create User
      </Button>

      <Button
        variant="contained"
        startIcon={<VisibilityIcon />}
        sx={{
          mb: 2,
          backgroundColor: "white",
          height: "50px",
          width: "200px",
          borderRadius: "30px",
          color: "black",
          fontWeight: "bold",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={handleOpenTicketClick}
      >
        Open Ticket
      </Button>

      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        sx={{
          height: "50px",
          width: "200px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "30px",
          fontWeight: "bold",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Modal
        title="Create New User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="create_user_form">
          <Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the email!",
              },
            ]}
          >
            <Input />
          </Item>
          <Form.Item
            name="platform"
            label="Platform"
            rules={[
              { required: true, message: "Please choose your platform!" },
            ]}
          >
            <Select
              placeholder="Choose your platform"
              style={dropDownStyle}
              options={platforms.map((platform) => ({
                value: platform.platform,
                label: platform.platform,
              }))}
            />
          </Form.Item>
          <Item
            name="enrollmentNumber"
            label="Enrollment Number"
            rules={[
              {
                required: true,
                message: "Please input the enrollment number!",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input the password!",
              },
            ]}
          >
            <Input.Password />
          </Item>
        </Form>
      </Modal>
    </Box>
  );
};

export default SupportManagerMenu;
