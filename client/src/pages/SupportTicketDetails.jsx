import React, { useEffect, useState } from "react";
import { Form, Input, notification } from "antd";
import { Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import SupportNavbar from "../components/layout/SupportNavbar";
import Loader from "../components/layout/Loader";
import "./SupportUserDashboard.css";
import SupportMngrNavbar from "../components/layout/SupportMngrNavbar";

const SupportTicketDetails = () => {
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

  const handleButtonClick = async (id) => {
    const role = localStorage.getItem("role");
    console.log("button data", id);
    try {
      await axios.put(
        `http://localhost:5000/api/support/closeticket/${id}`,

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Success",
        "Ticket closed successfully."
      );

      history.push("/supportmanagerdash");
    } catch (error) {
      console.error("Error updating ticket:", error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Ticket could not be closed, try again."
      );
    }
  };

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleReplyAndCloseClick = async (values) => {
    console.log("button clicked");
    try {
      await axios.put(
        `http://localhost:5000/api/support/addcommentandclose/${ticketId}`,
        { comment: values.comment, name, role },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      history.push(`/supportticketdetails/${ticketId}`);
      getTicket();
    } catch (error) {
      console.error("Error in updating ticket:", error);
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.put(
        `http://localhost:5000/api/support/addComment/${ticketId}`,
        { comment: values.comment, name, role },
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
      history.push(`/supportticketdetails/${ticketId}`);
      getTicket();
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
    <>
      <SupportMngrNavbar />
      <div className="main">
        <div
          style={{ marginRight: "150px", marginLeft: "150px" }}
          className="content"
        >
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
                  <h1 style={{ fontWeight: "bold" }}>Ticket details: </h1>
                  <div>Manager name: {ticket.manager}</div>
                  <div>Ticket status: {ticket.status}</div>
                  <div>Ticket subject: {ticket.description}</div>
                  <div>Ticket creation date: {ticket.dateCreated}</div>
                  <Button
                    style={{
                      backgroundColor: "red",
                      marginTop: "10px",
                      color: "white",
                      width: "140px",
                    }}
                    onClick={() => handleButtonClick(ticket._id)}
                  >
                    Close ticket
                  </Button>
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
                      style={{ background: "blue", color: "white" }}
                      htmlType="submit"
                      className="btn btn-success offset-4 mb-3 mt-4"
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={handleReplyAndCloseClick}
                      type="primary"
                      style={{
                        background: "black",
                        color: "white",
                        margin: "20px",
                      }}
                      htmlType="submit"
                      className="btn btn-success offset-4 mb-3 mt-4"
                    >
                      Reply and close
                    </Button>
                  </Form.Item>
                </Form>
                <h2>All comments</h2>
                <div className="comments-section">
                  {ticket.comments && ticket.comments.length > 0 ? (
                    ticket.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <div className="comment-header">
                          <span className="comment-author">{comment.name}</span>
                          <span className="comment-date">
                            {new Date(comment.date).toLocaleString()}
                          </span>
                        </div>
                        <div className="comment-body">{comment.comment}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ marginBottom: "30px" }}>
                      No comments available
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SupportTicketDetails;
