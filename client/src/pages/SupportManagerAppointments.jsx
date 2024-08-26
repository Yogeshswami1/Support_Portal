import React, { useEffect, useState } from "react";
import "./SupportUserDashboard.css";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import SupportManagerMenu from "../components/layout/SupportManagerMenu";
import SupportMngrNavbar from "../components/layout/SupportMngrNavbar";
import Loader from "../components/layout/Loader";
import { Modal, Form, Input, Rate, notification, Radio } from "antd";
import moment from "moment";

const SupportManagerAppointments = () => {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterId, setFilterId] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleButtonClick = async (id) => {
    console.log("button data", id);
    try {
      await axios.put(
        `http://localhost:5000/api/support/updateappointmentbyid/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Success",
        "Appointment updated successfully."
      );
      getAppointments();
      history.push("/supportmanagerappointment");
    } catch (error) {
      console.error("Error updating ticket:", error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Could not update appointment, try again."
      );
    }
  };

  console.log("all appointments", appointments);

  const getAppointments = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/support/getmanagerappointments",
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
    console.log(id);
    history.push(`/supportappointmentdetails/${id}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.post(
        `http://localhost:5000/api/support/reviewmanagerappointment/${selectedAppointment._id}`,
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
    <>
      <SupportMngrNavbar />
      <div className="smain">
        <div className="smenu">
          <SupportManagerMenu />
        </div>
        <div
          style={{
            marginTop: "100px",
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
          <Form layout="inline">
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
        <div className="scontent">
          {loadingData ? (
            <Loader />
          ) : filteredAppointments?.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Manager Comment</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    style={{ fontSize: "12px" }}
                    onClick={() => handleRowClick(appointment._id)}
                  >
                    <td>AP{appointment.appointmentId}</td>
                    <td>{appointment.name}</td>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.time}</td>
                    <td style={getRowStyle(appointment.status)}>
                      {appointment.status}
                    </td>
                    <td>
                      {appointment.status === "pending" ? (
                        <Button
                          onClick={() => handleButtonClick(appointment._id)}
                          style={{
                            height: "100%",
                            width: "150px",
                            padding: "1px",
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "green",
                            marginTop: "15px",
                          }}
                          type="primary"
                          htmlType="submit"
                        >
                          Mark complete
                        </Button>
                      ) : (
                        <h3>Appointment done</h3>
                      )}
                    </td>
                    {appointment.managerReview ? (
                      <td>{appointment.managerReview.comment}</td>
                    ) : (
                      <td>NA</td>
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="needs-validation"
        >
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[
              { required: true, message: "Please enter a valid comment" },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-success offset-4 mb-3 mt-4"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SupportManagerAppointments;
