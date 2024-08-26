import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import { Form, Input, Modal, notification, DatePicker, Select } from "antd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const { Item } = Form;
const { TextArea } = Input;

const SupportAdminMenu = () => {
  const history = useHistory();
  const [isManagerModalVisible, setIsManagerModalVisible] = useState(false);
  const [isHolidayModalVisible, setIsHolidayModalVisible] = useState(false);
  const [isPlatformModalVisible, setIsPlatformModalVisible] = useState(false); // New state for platform modal
  const [form] = Form.useForm();
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

  const handleDashboarClick = () => {
    history.push("/supportadmindash");
  };

  const handleAppointmentClick = () => {
    history.push("/supportadminappointments");
  };

  const handleGetManagerClick = () => {
    history.push("/allmanagers");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    openNotificationWithIcon("success", "Success", "Logged out successfully.");
    history.push("/supportadmin");
  };

  const showManagerModal = () => {
    setIsManagerModalVisible(true);
  };

  const showHolidayModal = () => {
    setIsHolidayModalVisible(true);
  };

  const showPlatformModal = () => {
    setIsPlatformModalVisible(true); // Show platform modal
  };

  const handleCancel = () => {
    setIsManagerModalVisible(false);
    setIsHolidayModalVisible(false);
    setIsPlatformModalVisible(false); // Hide platform modal
    form.resetFields();
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleManagerCreate = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/api/support/create-manager", values)
          .then((response) => {
            handleCancel();
            openNotificationWithIcon(
              "success",
              "Success",
              "New manager has been created successfully."
            );
          })
          .catch((error) => {
            openNotificationWithIcon(
              "error",
              "Failed",
              "There is a problem creating a new manager. Please try again."
            );
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleHolidaySubmit = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/api/support/make-holiday", values)
          .then((response) => {
            handleCancel();
            openNotificationWithIcon(
              "success",
              "Success",
              "Holiday has been set successfully."
            );
          })
          .catch((error) => {
            openNotificationWithIcon(
              "error",
              "Failed",
              "There was a problem setting the holiday. Please try again."
            );
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handlePlatformSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/api/support/add-platform", values) // Adjust the endpoint as necessary
          .then((response) => {
            handleCancel();
            openNotificationWithIcon(
              "success",
              "Success",
              "Platform has been added successfully."
            );
          })
          .catch((error) => {
            openNotificationWithIcon(
              "error",
              "Failed",
              "There was a problem adding the platform. Please try again."
            );
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancelHolidayClick = () => {
    axios
      .post("http://localhost:5000/api/support/end-holiday")
      .then((response) => {
        openNotificationWithIcon(
          "success",
          "Success",
          "Holiday has been cancelled successfully."
        );
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Failed",
          "There was a problem canceling the holiday. Please try again."
        );
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
        position: "relative",
        height: "calc(100vh - 80px)", // Adjust height as needed
        overflowY: "auto", // Enable vertical scrolling
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
        onClick={showManagerModal}
      >
        New Manager
      </Button>
      <Button
        variant="contained"
        startIcon={<PersonIcon />}
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
        onClick={handleGetManagerClick}
      >
        All Managers
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
        onClick={showHolidayModal}
      >
        Make Holiday
      </Button>
      <Button
        variant="contained"
        startIcon={<LibraryAddIcon />}
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
        onClick={showPlatformModal} // Show platform modal
      >
        Add Platform
      </Button>
      <Button
        variant="contained"
        startIcon={<CancelScheduleSendIcon />}
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
        onClick={handleCancelHolidayClick}
      >
        End Holiday
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
        onClick={handleLogoutClick}
      >
        Logout
      </Button>

      <Modal
        title="Create New Manager"
        visible={isManagerModalVisible}
        onOk={handleManagerCreate}
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
                type: "email",
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
              options={platforms.map((platform) => ({
                value: platform.platform,
                label: platform.platform,
              }))}
            />
          </Form.Item>
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

      <Modal
        title="Set a Holiday"
        visible={isHolidayModalVisible}
        onOk={handleHolidaySubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="holiday_form">
          <Item
            name="date"
            label="Holiday Date"
            rules={[
              {
                required: true,
                message: "Please select the date!",
              },
            ]}
          >
            <DatePicker />
          </Item>
          <Item
            name="message"
            label="Holiday Message"
            rules={[
              {
                required: true,
                message: "Please input the holiday message!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Item>
        </Form>
      </Modal>

      {/* New Platform Modal */}
      <Modal
        title="Add Platform"
        visible={isPlatformModalVisible}
        onOk={handlePlatformSubmit}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add_platform_form">
          <Item
            name="platform"
            label="Platform"
            rules={[
              {
                required: true,
                message: "Please input the platform name!",
              },
            ]}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
    </Box>
  );
};

export default SupportAdminMenu;
