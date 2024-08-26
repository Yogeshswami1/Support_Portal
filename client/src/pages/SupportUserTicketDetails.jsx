import React, { useEffect, useState } from "react";
import { Form, Input, notification } from "antd";
import { Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import SupportNavbar from "../components/layout/SupportNavbar";
import Loader from "../components/layout/Loader";
import "./SupportUserDashboard.css";
import UserLayout from "../components/layout/UserLayout";

const SupportUserTicketDetails = () => {
  const history = useHistory();
  const { id: ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [form] = Form.useForm();

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const getTicket = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/support/ticketbyid/${ticketId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const ticketData = response.data;
      setTicket(ticketData);
      form.setFieldsValue({
        platform: ticketData.platform,
        description: ticketData.description,
        manager: ticketData.manager,
      });
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getTicket();
  }, [ticketId]);

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.put(
        `http://localhost:5000/api/support/addComment/${ticketId}`,
        { comment: values.comment, name, role, email },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Success",
        "Comment added successfully."
      );
      history.push(`/supportuserticketdetails/${ticketId}`);
      getTicket(); // Refresh the ticket data to show the new comment
    } catch (error) {
      console.error("Error updating ticket:", error);
      openNotificationWithIcon(
        "error",
        "Failed",
        "Could not add comment, and try again."
      );
    }
  };

  return (
    <UserLayout>
      {/* <SupportNavbar /> */}
      <div className="main">
        <div style={{ marginRight: "150px" }} className="content">
          {loadingData ? (
            <Loader />
          ) : (
            ticket && (
              <div className="col-8 offset-3 mb-10">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "30px",
                  }}
                >
                  <h2>Your ticket details: </h2>
                  <div>Manager name: {ticket.manager}</div>
                  <div>Ticket status: {ticket.status}</div>
                  <div>Ticket subject: {ticket.description}</div>
                  <div>
                    Ticket creation date: {formatDate(ticket.dateCreated)}
                  </div>
                </div>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  className="needs-validation"
                >
                  <Form.Item
                    name="comment"
                    label="Comment"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid comment",
                      },
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
                <h2>All comments</h2>
                <div className="comments-section">
                  {ticket.comments && ticket.comments.length > 0 ? (
                    ticket.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <div className="comment-header">
                          <span className="comment-author">
                            <AccountCircleIcon />
                            {comment.name}
                          </span>
                          <span className="comment-date">
                            {new Date(comment.date).toLocaleString()}
                          </span>
                        </div>
                        <div className="comment-body">{comment.comment}</div>
                      </div>
                    ))
                  ) : (
                    <div>No comments available</div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default SupportUserTicketDetails;
