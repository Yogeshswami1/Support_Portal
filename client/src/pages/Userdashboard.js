import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  message,
  Button,
  Avatar,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Timeline, Event } from "react-timeline-scribble";

const { Title } = Typography;
const { Option } = Select;

const Userdashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://your-api-endpoint/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      message.error("Failed to fetch tasks. Please try again.");
      setLoading(false);
    }
  };

  const renderTimelineEvents = () => {
    return tasks.map((task) => (
      <Event
        interval={task.taskDate}
        title={`Task: ${task.task}`}
        subtitle={`Status: ${task.taskStatus}`}
        key={task.id}
      >
        Enrollment ID: {task.enrollmentId}
      </Event>
    ));
  };

  return (
    <div className="dashboard">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Task Timeline"
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Timeline>{renderTimelineEvents()}</Timeline>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Userdashboard;
