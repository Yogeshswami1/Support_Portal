import React, { useEffect, useState } from "react";
import { Table, notification, Button, Modal, Form, Input } from "antd";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import SupportNavbar from "../components/layout/SupportNavbar";
import Loader from "../components/layout/Loader";
import "./SupportUserDashboard.css";
import SupportMngrNavbar from "../components/layout/SupportMngrNavbar";

const SupportManagerAppointmentDetails = () => {
  const history = useHistory();
  const { id: ticketId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comment, setComment] = useState("");

  console.log("appointment data", appointments);

  const getAppointments = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/support/appointmentbyid/${ticketId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      notification.error({
        message: "Error",
        description:
          "Failed to fetch appointment details. Please try again later.",
      });
    }
    setLoadingData(false);
  };
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/support/addmanagercomment/${ticketId}`,
        { comment },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Success",
        "Comment submitted successfully."
      );
      console.log(response.data);
      setIsModalVisible(false);
      setComment("");
      getAppointments();
      history.push("/supportmanagerappointment");
    } catch (error) {
      console.error("Error adding comment:", error);
      openNotificationWithIcon(
        "error",
        "Error",
        "Comment is created, plaese try again."
      );
    }
  };

  useEffect(() => {
    getAppointments();
  }, [ticketId]);

  const getRowStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "RGB(248,222,126)" };
      case "open":
        return { backgroundColor: "rgb(41,171,135)", color: "white" };
      case "closed":
        return { backgroundColor: "rgb(41,171,135)", color: "white" };
      default:
        return {};
    }
  };

  const name = localStorage.getItem("name");

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  const data = [
    { key: "1", field: "User Name", details: appointments.name },
    { key: "2", field: "Email", details: appointments.email },
    { key: "3", field: "Enrollment No.", details: appointments.enrollment },
    { key: "4", field: "Phone", details: appointments.number },
    { key: "5", field: "Date", details: appointments.date },
    { key: "6", field: "Time", details: appointments.time },
    { key: "7", field: "Description", details: appointments.description },
    { key: "7", field: "Manager", details: appointments.manager },
    { key: "8", field: "Platform", details: appointments.platform },
    {
      key: "9",
      field: "Status",
      details: (
        <span style={getRowStyle(appointments.status)}>
          {appointments.status}
        </span>
      ),
    },
    {
      key: "10",
      field: "User Review",
      details: appointments.userReview
        ? appointments.userReview.comment
        : "N/A",
    },
    {
      key: "11",
      field: "User Rating",
      details: appointments.userReview ? appointments.userReview.rating : "N/A",
    },
  ];

  return (
    <>
      <SupportMngrNavbar />
      <div className="main">
        {loadingData ? (
          <Loader />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "120px",
                paddingLeft: "38%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Appointment Details
              </h1>
              <Button
                type="primary"
                onClick={() => setIsModalVisible(true)}
                style={{ marginBottom: "20px" }}
              >
                {localStorage.getItem("role") != "admin" ? (
                  <p>Add Comment</p>
                ) : (
                  ""
                )}
              </Button>
              {appointments ? (
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  bordered
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "140px",
                  }}
                >
                  <h1>No data found</h1>
                </div>
              )}
            </div>
            <Modal
              title="Add Comment"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onOk={handleAddComment}
            >
              <Form>
                <Form.Item label="Comment">
                  <Input.TextArea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default SupportManagerAppointmentDetails;
