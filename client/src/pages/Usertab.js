

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Avatar,
  Typography,
  Modal,
  Form,
  Input,
  Radio,
  Popover,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,

  FileTextOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const Usertab = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/users/get");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (values) => {
    try {
      if (editingUser) {
        await axios.put(`http://localhost:8000/api/users/${editingUser._id}`, values);
        message.success("User updated successfully");
      } else {
        await axios.post("http://localhost:8000/api/users/createuser", values);
        message.success("User added successfully");
      }
      fetchUsers();
      form.resetFields();
      setIsModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error adding/updating user:", error);
      message.error("Failed to save user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    }
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const columns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Primary Contact",
      dataIndex: "primaryContact",
      key: "primaryContact",
    },
    {
      title: "Secondary Contact",
      dataIndex: "secondaryContact",
      key: "secondaryContact",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status ? status.toUpperCase() : "UNKNOWN"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Popover
            content={
              <div>
                <img
                  src={record.documents?.pancard}
                  alt="Pan Card"
                  style={{ width: "100px", height: "auto" }}
                />
                <img
                  src={record.documents?.adhaarCard}
                  alt="Aadhaar Card"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            }
            title="Documents"
            trigger="click"
          >
            <Button icon={<EyeOutlined />}  style={{width:"4rem"}}/>
          </Popover>
          <Button style={{width:"4rem"}}
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          />
          <Button style={{width:"4rem"}}
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record._id)}
          />
        </>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (text, record) => (
    //     <>
    //       <Popover
    //         content={
    //           <div>
    //             <img src={record.documents?.pancard} alt="Pan Card" style={{ width: "100px", height: "auto" }} />
    //             <img src={record.documents?.adhaarCard} alt="Aadhaar Card" style={{ width: "100px", height: "auto" }} />
    //           </div>
    //         }
    //         title="Documents"
    //         trigger="click"
    //       >
    //         <Button icon={<FileTextOutlined />} />
    //       </Popover>
    //       <Button icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
    //       <Button icon={<DeleteOutlined />} onClick={() => handleDeleteUser(record._id)} />
    //     </>
    //   ),
    // },
  ];
  
  // const columns = [
  //   {
  //     title: "Enrollment ID",
  //     dataIndex: "enrollmentId",
  //     key: "enrollmentId",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "Primary Contact",
  //     dataIndex: "primaryContact",
  //     key: "primaryContact",
  //   },
  //   {
  //     title: "Secondary Contact",
  //     dataIndex: "secondaryContact",
  //     key: "secondaryContact",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status) => (
  //       <span style={{ color: status === "active" ? "green" : "red" }}>
  //         {status.toUpperCase()}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (text, record) => (
  //       <>
  //         <Popover
  //           content={
  //             <div>
  //               <img src={record.documents.pancard} alt="Pan Card" style={{ width: "100px", height: "auto" }} />
  //               <img src={record.documents.adhaarCard} alt="Aadhaar Card" style={{ width: "100px", height: "auto" }} />
  //             </div>
  //           }
  //           title="Documents"
  //           trigger="click"
  //         >
  //           <Button icon={<FileTextOutlined />} />
  //         </Popover>
  //         <Button icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
  //         <Button icon={<DeleteOutlined />} onClick={() => handleDeleteUser(record._id)} />
  //       </>
  //     ),
  //   },
  // ];

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            title="Users"
            extra={
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add User
              </Button>
            }
          >
            <Table columns={columns} dataSource={users} rowKey="_id" />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleAddUser(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="enrollmentId" label="Enrollment ID" rules={[{ required: true, message: "Please input the enrollment ID!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please input the date!" }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="primaryContact" label="Primary Contact" rules={[{ required: true, message: "Please input the primary contact!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="secondaryContact" label="Secondary Contact">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status!" }]}>
            <Radio.Group>
              <Radio.Button value="active">Active</Radio.Button>
              <Radio.Button value="inactive">Inactive</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={["documents", "pancard"]} label="Pan Card URL">
            <Input />
          </Form.Item>
          <Form.Item name={["documents", "adhaarCard"]} label="Aadhaar Card URL">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Usertab;

