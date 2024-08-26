import React, { useEffect, useState } from "react";
import SupportNavbar from "../components/layout/SupportNavbar.jsx";
import "./SupportHome.css";
import BookAppointmentForm from "../components/BookAppointmentForm.jsx";
import SupportFooter from "../components/layout/SupportFooter.jsx";
import { getUser } from "../redux/userSlice.jsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import HolidayNav from "../components/layout/HolidayNav.jsx";
import { useHistory } from "react-router-dom";
import { Modal, Form, Input, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const SupportHome = () => {
  const dispatch = useDispatch();
  const [holidays, setHolidays] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const buttonStyle = {
    backgroundColor: "#5A51C1",
    color: "White",
    borderRadius: "20px",
    fontWeight: "bold",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/support/holiday"
        );
        console.log("Holiday data:", response.data);
        setHolidays(response.data);
      } catch (err) {
        console.log("Error fetching holiday data:", err);
      }
    };
    fetchData();
  }, []);

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

      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      history.push("/supportuserdashboard"); // Redirect after successful login
    } catch (error) {
      console.error(error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Please check your username and password, and try again."
      );
    }
  };

  const handleAppointmentClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/supportuserbookappointment");
    } else {
      showModal();
    }
  };

  return (
    <>
      {holidays.length > 0 ? (
        <div
          className="holidayContainer"
          style={{
            marginTop: "10px",
          }}
        >
          <HolidayNav />
          <div
            className="holidayContent"
            style={{
              height: "100vh",
              display: "flex",
              padding: "150px",
            }}
          >
            {holidays.map((holiday, index) => (
              <div key={index} className="holidayItem">
                <h2>Dear Valued User,</h2>
                <p>
                  We regret to inform you that the support portal is currently
                  closed due to <strong>{holiday.message}</strong>.
                </p>
                <p>
                  Please note that the portal will reopen on{" "}
                  <strong>
                    {new Date(holiday.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </strong>
                  . During this time, you will not be able to access support
                  services through the portal. We apologize for any
                  inconvenience this may cause and appreciate your understanding
                  and patience.
                </p>
                <p>Thank you for your cooperation.</p>
                <p>Sincerely,</p>
                <strong>Saumic craft Support Team</strong>
              </div>
            ))}
          </div>
          <SupportFooter />
        </div>
      ) : (
        <>
          <SupportNavbar />
          <div className="mainHome">
            <div className="heroTitle">
              <h1>
                PREMIUM SUPPORT
                <br />
                AND HELP DESK
              </h1>
              <Button
                variant="contained"
                style={buttonStyle}
                onClick={handleAppointmentClick}
              >
                Book Appointment
              </Button>
            </div>
            <div className="heroImg">
              <img
                src="https://support.saumiccraft.com/wp-content/uploads/2023/05/support-illustration-600x698-1.png"
                alt="support"
              />
            </div>
          </div>

          <div className="video">
            <div className="videoContent">
              <h2>How to use support portal</h2>
            </div>
            <div className="childVideo">
              <div className="innerVideo">
                <h1>video 1</h1>
              </div>
              <div className="innerVideo">
                <h1>video 2</h1>
              </div>
              <div className="innerVideo">
                <h1>video 3</h1>
              </div>
            </div>
          </div>
          <SupportFooter />
        </>
      )}

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
    </>
  );
};

export default SupportHome;
