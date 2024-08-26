import React, { useEffect, useState } from "react";
import SupportUserDashboardMenu from "../components/layout/SupportUserDashboardMenu";
import SupportNavbar from "../components/layout/SupportNavbar";
import "./SupportUserDashboard.css";
import axios from "axios";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Input, Modal, Rate, notification, Radio } from "antd";
import Loader from "../components/layout/Loader";
import moment from "moment";
import UserLayout from "../components/layout/UserLayout";

const SupportUserAppointment = () => {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form] = Form.useForm();
  const [filterId, setFilterId] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  console.log("all appointments", appointments);

  const getAppointments = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/support/getappointments",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        const sortedAppointments = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAppointments(sortedAppointments);
      } else {
        console.error("Error: API response is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getRowStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: "#FFD9D6",
          color: "#FF7A70",
          fontWeight: "bold",
        };
      case "open":
        return {
          backgroundColor: "rgb(203,234,205)",
          color: "green",
          fontWeight: "bold",
        };
      case "closed":
        return {
          backgroundColor: "#E3E4DD",
          color: "rgb(54, 51, 51)",
          fontWeight: "bold",
        };
      default:
        return {};
    }
  };

  const handleRowClick = (id) => {
    window.location.href = `#${id}`;
  };

  const handleReviewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
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

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.post(
        `http://localhost:5000/api/support/reviewappointment/${selectedAppointment._id}`,
        values,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Success",
        "Review submitted successfully."
      );
      handleCancel();
      getAppointments();
    } catch (error) {
      console.error("Error submitting review:", error);
      openNotificationWithIcon(
        "error",
        "Submission Failed",
        "There was an error submitting your review. Please try again."
      );
    }
  };

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filterAppointments = (appointments, filterOption, statusFilter) => {
    const today = moment().startOf("day");
    let filteredAppointments = appointments;

    if (filterOption !== "all") {
      filteredAppointments = filteredAppointments.filter((appointment) =>
        moment(appointment.date).isSame(today, filterOption)
      );
    }

    if (statusFilter !== "all") {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.status === statusFilter
      );
    }

    return filteredAppointments;
  };

  const filteredAppointments = filterId
    ? filterAppointments(
        appointments.filter((appointment) =>
          appointment.appointmentId.toString().includes(filterId)
        ),
        filterOption,
        statusFilter
      )
    : filterAppointments(appointments, filterOption, statusFilter);

  return (
    <UserLayout>
      {/* <SupportNavbar /> */}
      <div className="main">
        <div className="menu ">{/* <SupportUserDashboardMenu /> */}</div>
        <div
          className="fltr"
          style={{
            marginTop: "30px",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            right: "20px",
            height: "60px",
            width: "76%",
            paddingLeft: "10%",
            backgroundColor: "white",
            zIndex: "100",
            justifyContent: "center",
          }}
        >
          <Form layout="inline" className="filteruserapp">
            <Form.Item label="Filter by ID" className="custom-form-item">
              <Input
                placeholder="Enter appointment id"
                value={filterId}
                onChange={handleFilterChange}
              />
            </Form.Item>
            <Form.Item label="Filter by Status" className="custom-form-item">
              <FormControl variant="outlined" size="small">
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Status Filter"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="closed">Resolved</MenuItem>
                  <MenuItem value="pending">Unresolved</MenuItem>
                </Select>
              </FormControl>
            </Form.Item>
            <Form.Item className="custom-form-item">
              <Radio.Group
                value={filterOption}
                onChange={handleFilterOptionChange}
              >
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="day">Today</Radio.Button>
                <Radio.Button value="week">This Week</Radio.Button>
                <Radio.Button value="month">This Month</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
        <div className="content" id="userapcontent">
          {loadingData ? (
            <Loader />
          ) : filteredAppointments?.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>A.ID</th>
                  <th>Number</th>
                  <th>Email</th>
                  <th>Manager</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleRowClick(appointment._id)}
                  >
                    <td>AP{appointment.appointmentId}</td>
                    <td>{appointment.number}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.manager}</td>
                    <td>{appointment.description}</td>
                    <td>{formatDate(appointment.date)}</td>
                    <td style={{ width: "10px" }}>{appointment.time}</td>
                    <td style={getRowStyle(appointment.status)}>
                      {appointment.status}
                    </td>

                    {appointment.userReview ? (
                      <td>
                        <h4>{appointment.userReview.rating} Star</h4>
                      </td>
                    ) : (
                      <td>
                        <Button
                          style={{ backgroundColor: "green", color: "white" }}
                          onClick={() => handleReviewClick(appointment)}
                        >
                          Review
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "140px",
              }}
              id="defauler"
            >
              <h1>No data found</h1>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Leave a Review"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please select a rating" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: "Please leave a comment" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </UserLayout>
  );
};

export default SupportUserAppointment;
