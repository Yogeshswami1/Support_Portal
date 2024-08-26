import React, { useEffect, useState } from "react";
import "./SupportUserDashboard.css";
import axios from "axios";
import SupportAdminNav from "../components/layout/SupportAdminNav";
import SupportAdminMenu from "../components/layout/SupportAdminMenu";
import Loader from "../components/layout/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Select, Input } from "antd";

const { Option } = Select;

const SupportAdminDash = () => {
  const history = useHistory();
  const [tickets, setTickets] = useState([]);
  const [ticketIdFilter, setTicketIdFilter] = useState(""); // New state for ticket ID filter

  const [statusFilter, setStatusFilter] = useState("");

  const [loadingData, setLoadingData] = useState(false);

  console.log(tickets);

  const getTicket = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/support/getallticket",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getTicket();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getRowStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#F9FFEB", color: "#DAFF85" };
      case "Open":
        return {
          backgroundColor: "rgb(203,234,205)",
          color: "green",
          fontWeight: "bold",
        };
      case "Closed":
        return {
          backgroundColor: "#E3E4DD",
          color: "rgb(54, 51, 51)",
          fontWeight: "bold",
        };
      default:
        return {
          backgroundColor: "#FFD9D6",
          color: "#FF7A70",
          fontWeight: "bold",
        };
    }
  };

  const handleRowClick = (id) => {
    history.push(`/supportadminticketdetails/${id}`);
  };
  const handleTicketIdChange = (e) => {
    setTicketIdFilter(e.target.value);
  };
  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    const matchesTicketId = ticketIdFilter
      ? ticket.ticketId.toString().includes(ticketIdFilter)
      : true;
    return matchesStatus && matchesTicketId;
  });

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
            paddingLeft: "15%",
            backgroundColor: "white",
            zIndex: "100",
            justifyContent: "center",
          }}
        >
          <Form layout="inline">
            <Form.Item label="Filter">
              <Select
                placeholder="Select status"
                onChange={handleStatusChange}
                allowClear
                style={{ width: 200 }}
              >
                <Option value="closed">Resolved</Option>
                <Option value="Open">Unresolved</Option>

                <Option value="Waiting for customer reply">
                  Waiting for Customer Reply
                </Option>
                <Option value="Waiting for manager reply">
                  Waiting for manager reply
                </Option>
              </Select>
            </Form.Item>
            <Form.Item label="Filter by Ticket ID">
              <Input
                placeholder="Enter ticket id here..."
                onChange={handleTicketIdChange}
                style={{ width: 200 }}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="scontent">
          {loadingData ? (
            <Loader />
          ) : filteredTickets?.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Subject</th>
                  <th>Managers</th>
                  <th>Date Created</th>
                  <th>Date Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    style={{ fontSize: "12px" }}
                    onClick={() => handleRowClick(ticket._id)}
                  >
                    <td>TCK{ticket.ticketId}</td>
                    <td style={getRowStyle(ticket.status)}>{ticket.status}</td>
                    <td>{ticket.description}</td>
                    <td>{ticket.manager}</td>
                    <td>{formatDate(ticket.dateCreated)}</td>
                    <td>{ticket.dateUpdated}</td>
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

export default SupportAdminDash;
