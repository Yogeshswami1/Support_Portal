import React, { useEffect, useState } from "react";
import "./SupportUserDashboard.css";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import SupportAdminNav from "../components/layout/SupportAdminNav";
import SupportAdminMenu from "../components/layout/SupportAdminMenu";
import Loader from "../components/layout/Loader";
import { notification, Input, Form, Radio } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SupportAdminAppointment = () => {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dateFilterOption, setDateFilterOption] = useState("all");
  const [statusFilterOption, setStatusFilterOption] = useState("all");
  const [filterId, setFilterId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  console.log("all appointments", appointments);

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
      history.push("/supportadminappointments");
    } catch (error) {
      console.error("Error updating appointment:", error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Could not update appointment, try again."
      );
    }
  };

  const getAppointments = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/support/getallappointments",
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

  const handleDateFilterOptionChange = (event) => {
    setDateFilterOption(event.target.value);
  };
  const handleFilterOptionChange = (event) => {
    setDateFilterOption(event.target.value);
  };

  const handleStatusFilterOptionChange = (event) => {
    setStatusFilterOption(event.target.value);
  };

  const filterAppointments = (
    appointments,
    dateFilterOption,
    statusFilterOption,
    selectedDate
  ) => {
    const today = moment().startOf("day");
    let filteredAppointments = appointments;

    if (selectedDate) {
      filteredAppointments = filteredAppointments.filter((appointment) =>
        moment(appointment.date).isSame(moment(selectedDate), "day")
      );
    } else {
      switch (dateFilterOption) {
        case "day":
          filteredAppointments = filteredAppointments.filter((appointment) =>
            moment(appointment.date).isSame(today, "day")
          );
          break;
        case "week":
          filteredAppointments = filteredAppointments.filter((appointment) =>
            moment(appointment.date).isSame(today, "week")
          );
          break;
        case "month":
          filteredAppointments = filteredAppointments.filter((appointment) =>
            moment(appointment.date).isSame(today, "month")
          );
          break;
        default:
          break;
      }
    }

    switch (statusFilterOption) {
      case "pending":
        filteredAppointments = filteredAppointments.filter(
          (appointment) => appointment.status === "pending"
        );
        break;
      case "closed":
        filteredAppointments = filteredAppointments.filter(
          (appointment) => appointment.status === "closed"
        );
        break;
      default:
        break;
    }

    return filteredAppointments;
  };

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const filteredAppointments = filterId
    ? appointments.filter((appointment) =>
        appointment.appointmentId.toString().includes(filterId)
      )
    : filterAppointments(
        appointments,
        dateFilterOption,
        statusFilterOption,
        selectedDate
      );

  return (
    <>
      <SupportAdminNav />
      <div className="smain">
        <div className="smenu">
          <SupportAdminMenu />
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
            <Form.Item label="Filter" className="custom-form-item">
              <Input
                placeholder="Enter appointment id"
                value={filterId}
                onChange={handleFilterChange}
              />
            </Form.Item>

            <Form.Item label="Filter by Status" className="custom-form-item">
              <FormControl variant="outlined" size="small">
                <Select
                  value={statusFilterOption}
                  onChange={handleStatusFilterOptionChange}
                  label="Status Filter"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="closed">Resolved</MenuItem>

                  <MenuItem value="pending">Unresolved</MenuItem>
                </Select>
              </FormControl>
            </Form.Item>
            {/* <Form.Item className="custom-form-item">
              <Radio.Group
                value={dateFilterOption}
                onChange={handleFilterOptionChange}
              >
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="day">Today</Radio.Button>
                <Radio.Button value="week">This Week</Radio.Button>
                <Radio.Button value="month">This Month</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item label="Filter by Date" className="custom-form-item">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
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
                  <th>Id</th>
                  <th>Name</th>
                  <th>Manager</th>
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
                    style={{
                      fontSize: "12px",
                    }}
                    onClick={() => handleRowClick(appointment._id)}
                  >
                    <td>AP{appointment.appointmentId}</td>
                    <td>{appointment.name}</td>
                    <td>{appointment.manager}</td>
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
                            marginTop: "2px",
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
    </>
  );
};

export default SupportAdminAppointment;
