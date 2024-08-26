import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, notification } from "antd";
import { Box, Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import SupportNavbar from "../components/layout/SupportNavbar";
import Loader from "../components/layout/Loader";
import "./SupportUserDashboard.css";

const { Option } = Select;

const SupportAdminTicketDetails = () => {
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

  const handleButtonClick = async (id) => {
    console.log("button data", id);
    try {
      await axios.put(
        `http://localhost:5000/api/support/closeticket/${id}`,
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
        "Ticket closed successfully."
      );
      history.push("/supportadmindash");
    } catch (error) {
      console.error("Error updating ticket:", error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Ticket could not be closed, try again."
      );
    }
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

  const onFinish = async (values) => {
    try {
      await axios.put(
        `http://localhost:5000/api/support/updateuserticket/${ticketId}`,
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
        "Ticket updated successfully."
      );
      history.push("/supportadmindash");
    } catch (error) {
      console.error("Error updating ticket:", error);
      openNotificationWithIcon(
        "error",
        "Login Fail",
        "Please check your username and password, and try again."
      );
    }
  };

  return (
    <>
      <SupportNavbar />
      <div className="main">
        <div style={{ marginRight: "150px" }} className="content">
          {loadingData ? (
            <Loader />
          ) : (
            ticket && (
              <>
                <Form
                  style={{
                    border: "1px solid blue",
                    padding: "30px",
                    borderRadius: "20px",
                    marginLeft: "120px",
                    marginTop: "90px",
                  }}
                  layout="vertical"
                  onFinish={onFinish}
                  form={form}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#353979",
                      }}
                    >
                      Update your data
                    </h2>
                    <Button
                      style={{
                        marginLeft: "100px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                      onClick={() => handleButtonClick(ticket._id)}
                    >
                      Close ticket
                    </Button>
                  </div>
                  <Form.Item
                    name="platform"
                    label="Platform"
                    rules={[
                      { required: true, message: "Please select a platform!" },
                    ]}
                  >
                    <Select placeholder="Select a platform">
                      <Option value="amazon">Amazon.in</Option>
                      <Option value="flipkart">Flipkart</Option>
                      <Option value="meesho">Meesho</Option>
                      <Option value="esty">Esty</Option>
                      <Option value="website">Website</Option>
                      <Option value="amazon india">Amazon India</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please input the description!",
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item
                    name="manager"
                    label="Managers"
                    rules={[
                      { required: true, message: "Please select a manager!" },
                    ]}
                  >
                    <Select placeholder="Select a manager">
                      <Option value="SM 1">SM 1</Option>
                      <Option value="SM 2">SM 2</Option>
                      <Option value="SM 3">SM 3</Option>
                      <Option value="SM 8">SM 8</Option>
                      <Option value="Team Leader 2(Habib)">
                        Team Leader 2(Habib)
                      </Option>
                      <Option value="Prakash(Esty)">Prakash(Esty)</Option>
                      <Option value="Prakash(Amazon.in)">
                        Prakash(Amazon.in)
                      </Option>
                      <Option value="Dipanshu(Amazon.com)">
                        Dipanshu(Amazon.com)
                      </Option>
                      <Option value="Team Leader 6 Ujjawal (Amazon.in)">
                        Team Leader 6 Ujjawal (Amazon.in)
                      </Option>
                      <Option value="Mukesh (Payment)">Mukesh (Payment)</Option>
                      <Option value="Dinesh (Glowroad)">
                        Dinesh (Glowroad)
                      </Option>
                      <Option value="Team Leader 7 (Meesho)">
                        Team Leader 7 (Meesho)
                      </Option>
                      <Option value="Manish(Amazon.com)">
                        Manish(Amazon.com)
                      </Option>
                      <Option value="Team Leader 5 (Abeer)">
                        Team Leader 5 (Abeer)
                      </Option>
                      <Option value="Team Leader 4 (Rahul)">
                        Team Leader 4 (Rahul)
                      </Option>
                      <Option value="Team Leader 3 (Ritu)">
                        Team Leader 3 (Ritu)
                      </Option>
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
                <h2 style={{ marginTop: "30px", marginLeft: "120px" }}>
                  All comments
                </h2>
                <div
                  className="comments-section"
                  style={{ marginLeft: "120px" }}
                >
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
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SupportAdminTicketDetails;
