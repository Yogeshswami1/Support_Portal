import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Modal, Select, notification } from "antd";
import SupportAdminNav from "../components/layout/SupportAdminNav";
import SupportAdminMenu from "../components/layout/SupportAdminMenu";
import Loader from "../components/layout/Loader";
import { Button } from "@mui/material";

const { Option } = Select;

const SupportManagerDetails = () => {
  const { id } = useParams();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 100 },
    });
  };

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/support/getmanager/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setManager(response.data);
      } catch (error) {
        console.error("Error fetching manager details:", error);
      } finally {
        setLoading(false);
      }
    };

    const getPlatform = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/support/get-platform",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPlatforms(response.data);
      } catch (err) {
        console.log("Error fetching platforms:", err);
      }
    };

    fetchManagerDetails();
    getPlatform();
  }, [id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/support/assign-platform/${id}`,
        { platform: selectedPlatform },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Platform assigned successfully:", response.data);

      // Display success notification
      openNotificationWithIcon(
        "success",
        "Success",
        "Platform assigned successfully."
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error assigning platform:", error);

      // Display error notification
      openNotificationWithIcon(
        "error",
        "Error",
        "Failed to assign platform. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePlatformChange = (value) => {
    setSelectedPlatform(value);
  };

  return (
    <>
      <SupportAdminNav />
      <div className="smain">
        <div className="smenu">
          <SupportAdminMenu />
        </div>
        <div className="scontent">
          {loading ? (
            <Loader />
          ) : manager ? (
            <Card
              title={manager.name}
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <p>Email: {manager.email}</p>
              <p>Platform: {manager.platform}</p>
              <p>
                Date of Joining:{" "}
                {new Date(manager.createdAt).toLocaleDateString()}
              </p>
              <p>Other Details: {manager.otherDetails}</p>
              <Button variant="contained" onClick={showModal}>
                Update Platform
              </Button>
            </Card>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "140px",
              }}
            >
              <h1>No details found</h1>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Assign Platform"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Assign"
        cancelText="Cancel"
      >
        <Select
          placeholder="Select a platform"
          onChange={handlePlatformChange}
          style={{ width: "100%" }}
        >
          {platforms.map((platform) => (
            <Option key={platform._id} value={platform.platform}>
              {platform.platform}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default SupportManagerDetails;
