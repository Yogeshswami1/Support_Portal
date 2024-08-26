import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { Redirect } from "react-router-dom";

const RaiseTicket = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form] = Form.useForm();

  const buttonStyle = {
    position: "absolute",
    right: "50px",
    top: "30px",
    background: "white",
    color: "black",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "large",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    border: "2px solid white",
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 100 },
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) => {
    console.log("Form values:", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/support/user-login",
        values
      );

      setIsModalVisible(false);
      form.resetFields();
      openNotificationWithIcon(
        "success",
        "Success",
        "You have logged in successfully."
      );

      console.log(response.data);

      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setIsAuthenticated(true); // Set authentication state to true
    } catch (error) {
      console.error(error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Please check your username and password, and try again."
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/supportuserdashboard" />; // Redirect to the dashboard
  }

  return (
    <div>
      <Button style={buttonStyle} type="primary" onClick={showModal}>
        Raise Ticket
      </Button>
      <Modal
        title="Login"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                background: "#353979",
                boxShadow:
                  "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                alignItems: "center",
              }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RaiseTicket;
