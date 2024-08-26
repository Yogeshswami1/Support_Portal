import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import { Modal, Form, Input, Select, notification } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Option } = Select;

const SupportUserDashboardMenu = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loggedout, setLoggedout] = useState(false);
  const [form] = Form.useForm();

  const handleDashboardClick = () => {
    history.push("/supportuserdash");
  };
  const handleAppointmentClick = () => {
    history.push("/supportuserappointment");
  };

  const handleOpenTicketClick = () => {
    history.push("/supportuseropenticket");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedout(true);
  };

  if (loggedout) {
    openNotificationWithIcon(
      "success",
      "Success",
      "User logged out successfully."
    );
    return <Redirect to="/support"></Redirect>;
  }

  const onFinish = async (values) => {
    console.log("Form values:", localStorage.getItem("id"));
    console.log("manager is : " + values.manager);
    const formattedValues = {
      ...values,
      userId: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      status: "open",
      priority: "normal",
      assignee: values.manager,
    };
    axios
      .post("http://localhost:5000/api/support/newticket", formattedValues, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data);
        setIsModalVisible(false);
        form.resetFields();
        openNotificationWithIcon(
          "success",
          "New ticket raised",
          "New ticket created successfully."
        );
      })
      .catch((error) => {
        console.error(error);
        openNotificationWithIcon(
          "error",
          "Failed",
          "There was an error creating new ticket. Please try again."
        );
      });
  };

  // if (ticketData !== null) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/supportuserdash",
  //         state: ticketData,
  //       }}
  //     />
  //   );
  // }

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        // display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 5,
        bgcolor: "background.paper",
        borderRadius: 5,
        maxWidth: 300,
        m: "auto",
        textAlign: "center",
        marginTop: "120px",
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
        onClick={handleDashboardClick}
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
        startIcon={<AddCircleOutlineIcon />}
        sx={{
          mb: 2,
          height: "50px",
          width: "200px",
          backgroundColor: "white",
          borderRadius: "30px",
          color: "black",
          fontWeight: "bold",
          fontSize: "medium",
          boxShadow: 5,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={showModal}
      >
        New Ticket
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
            color: "blue",
          },
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Modal
        title="New Ticket"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="platform"
            label="Platform"
            rules={[{ required: true, message: "Please select a platform!" }]}
          >
            <Select placeholder="Select a platform">
              <Select.Option value="amazon">Amazon.in</Select.Option>
              <Select.Option value="flipkart">Flipkart</Select.Option>
              <Select.Option value="meesho">Meesho</Select.Option>
              <Select.Option value="esty">Esty</Select.Option>
              <Select.Option value="website">Website</Select.Option>
              <Select.Option value="amazon india">Amazon India</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="manager"
            label="Managers"
            rules={[{ required: true, message: "Please select a manager!" }]}
          >
            <Select placeholder="Select a manager">
              <Option value="SM 1">SM 1</Option>
              <Option value="SM 2">SM 2</Option>
              <Option value="SM 3">SM 3</Option>
              <Option value="SM 8">SM 8</Option>
              <Option value="Team Leader 2(Habib)">Team Leader 2(Habib)</Option>
              <Option value="Prakash(Esty)">Prakash(Esty)</Option>
              <Option value="Prakash(Amazon.in)">Prakash(Amazon.in)</Option>
              <Option value="Dipanshu(Amazon.com)">Dipanshu(Amazon.com)</Option>
              <Option value="Team Leader 6 Ujjawal (Amazon.in)">
                Team Leader 6 Ujjawal (Amazon.in)
              </Option>
              <Option value="Mukesh (Payment)">Mukesh (Payment)</Option>
              <Option value="Dinesh (Glowroad)">Dinesh (Glowroad)</Option>
              <Option value="Team Leader 7 (Meesho)">
                Team Leader 7 (Meesho)
              </Option>
              <Option value="Manish(Amazon.com)">Manish(Amazon.com)</Option>
              <Option value="Team Leader 5 (Abeer)">
                Team Leader 5 (Abeer)
              </Option>
              <Option value="Team Leader 4 (Rahul)">
                Team Leader 4 (Rahul)
              </Option>
              <Option value="Team Leader 3 (Ritu)">Team Leader 3 (Ritu)</Option>
              <Option value="Website TL9">Website TL9</Option>
              <Option value="Website TL10">Website TL10</Option>
              <Option value="Website TL11">Website TL11</Option>
              <Option value="Website TL12">Website TL12</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Box>
  );
};

export default SupportUserDashboardMenu;
