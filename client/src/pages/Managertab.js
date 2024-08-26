// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import {
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Typography,
//   Modal,
//   Form,
//   Input,
//   Radio,
//   Popover,
//   message,
// } from "antd";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   FileTextOutlined,
// } from "@ant-design/icons";
// import axios from "axios";

// const { Title } = Typography;

// const Managertab = () => {
//   const [managers, setManagers] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editingManager, setEditingManager] = useState(null);

//   useEffect(() => {
//     fetchManagers();
//   }, []);

//   const fetchManagers = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/managers/get");
//       setManagers(data);
//     } catch (error) {
//       console.error("Error fetching managers:", error);
//     }
//   };

//   const handleAddManager = async (values) => {
//     try {
//       if (editingManager) {
//         await axios.put(`http://localhost:8000/api/managers/${editingManager._id}`, values);
//         message.success("Manager updated successfully");
//       } else {
//         await axios.post("http://localhost:8000/api/managers/create", values);
//         message.success("Manager added successfully");
//       }
//       fetchManagers();
//       form.resetFields();
//       setIsModalVisible(false);
//       setEditingManager(null);
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         message.error("Email already exists. Please use a different email.");
//       } else {
//         console.error("Error adding/updating manager:", error);
//         message.error("Failed to save manager");
//       }
//     }
//   };

//   const handleDeleteManager = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/managers/${id}`);
//       message.success("Manager deleted successfully");
//       fetchManagers();
//     } catch (error) {
//       console.error("Error deleting manager:", error);
//       message.error("Failed to delete manager");
//     }
//   };

//   const handleEditManager = (record) => {
//     setEditingManager(record);
//     form.setFieldsValue({
//       ...record,
//       joiningDate: record.joiningDate ? moment(record.joiningDate) : null, // Assuming you're using moment.js for date handling
//     });
//     setIsModalVisible(true);
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Position",
//       dataIndex: "position",
//       key: "position",
//     },
//     {
//       title: "Joining Date",
//       dataIndex: "joiningDate",
//       key: "joiningDate",
//       render: (joiningDate) => joiningDate ? moment(joiningDate).format('YYYY-MM-DD') : '-',
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },
//     {
//       title: "Contact Number",
//       dataIndex: "contactNumber",
//       key: "contactNumber",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <span style={{ color: status === "active" ? "green" : "red" }}>
//           {status.toUpperCase()}
//         </span>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <>
//           <Popover
//             content={
//               <div>
//                 <img src={record.documents?.pancard} alt="Pan Card" style={{ width: "100px", height: "auto" }} />
//                 <img src={record.documents?.adhaarCard} alt="Aadhaar Card" style={{ width: "100px", height: "auto" }} />
//               </div>
//             }
//             title="Documents"
//             trigger="click"
//           >
//             <Button icon={<FileTextOutlined />} />
//           </Popover>
//           <Button icon={<EditOutlined />} onClick={() => handleEditManager(record)} />
//           <Button icon={<DeleteOutlined />} onClick={() => handleDeleteManager(record._id)} />
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Row gutter={[24, 0]}>
//         <Col xs={24} xl={24}>
//           <Card
//             bordered={false}
//             title="Managers"
//             extra={
//               <Button type="primary" onClick={() => setIsModalVisible(true)}>
//                 Add Manager
//               </Button>
//             }
//           >
//             <Table columns={columns} dataSource={managers} rowKey="_id" />
//           </Card>
//         </Col>
//       </Row>

//       <Modal
//         title={editingManager ? "Edit Manager" : "Add Manager"}
//         visible={isModalVisible}
//         onCancel={() => {
//           setIsModalVisible(false);
//           setEditingManager(null);
//           form.resetFields();
//         }}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               handleAddManager(values);
//             })
//             .catch((info) => {
//               console.log("Validate Failed:", info);
//             });
//         }}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="position" label="Position" rules={[{ required: true, message: "Please input the position!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="dateOfJoining" label="Joining Date" rules={[{ required: true, message: "Please input the joining date!" }]}>
//             <Input type="date" /> 
//           </Form.Item>
//           <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input the address!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: "Please input the contact number!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status!" }]}>
//             <Radio.Group>
//               <Radio.Button value="active">Active</Radio.Button>
//               <Radio.Button value="inactive">Inactive</Radio.Button>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item name={["documents", "pancard"]} label="Pan Card URL">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["documents", "adhaarCard"]} label="Adhaar Card URL">
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Managertab;


import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  Radio,
  Popover,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const Managertab = () => {
  const [managers, setManagers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingManager, setEditingManager] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/managers/get");
      setManagers(data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleAddManager = async (values) => {
    try {
      if (editingManager) {
        await axios.patch(`http://localhost:8000/api/managers/${editingManager._id}`, values);
        message.success("Manager updated successfully");
      } else {
        await axios.post("http://localhost:8000/api/managers/create", values);
        message.success("Manager added successfully");
      }
      fetchManagers();
      form.resetFields();
      setIsModalVisible(false);
      setEditingManager(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error("Email already exists. Please use a different email.");
      } else {
        console.error("Error adding/updating manager:", error);
        message.error("Failed to save manager");
      }
    }
  };

  const handleDeleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/managers/${id}`);
      message.success("Manager deleted successfully");
      fetchManagers();
    } catch (error) {
      console.error("Error deleting manager:", error);
      message.error("Failed to delete manager");
    }
  };

  const handleEditManager = (record) => {
    setEditingManager(record);
    form.setFieldsValue({
      ...record,
      dateOfJoining: record.dateOfJoining ? moment(record.dateOfJoining) : null, // Assuming you're using moment.js for date handling
    });
    setIsModalVisible(true);
  };

  const columns = [
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
      render: (dateOfJoining) => dateOfJoining ? moment(dateOfJoining).format('YYYY-MM-DD') : '-',
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status.toUpperCase()}
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
                <img src={record.documents?.pancard} alt="Pan Card" style={{ width: "100px", height: "auto" }} />
                <img src={record.documents?.adhaarCard} alt="Aadhaar Card" style={{ width: "100px", height: "auto" }} />
              </div>
            }
            title="Documents"
            trigger="click"
          >
            <Button icon={<FileTextOutlined />}  style={{width:"4rem"}}/>
          </Popover>
          <Button icon={<EditOutlined />} onClick={() => handleEditManager(record)} style={{width:"4rem"}}/>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteManager(record._id)} style={{width:"4rem"}}/>
        </>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            title="Managers"
            extra={
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add Manager
              </Button>
            }
          >
            <Table columns={columns} dataSource={managers} rowKey="_id" />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingManager ? "Edit Manager" : "Add Manager"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingManager(null);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleAddManager(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Position" rules={[{ required: true, message: "Please input the position!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dateOfJoining" label="Joining Date" rules={[{ required: true, message: "Please input the joining date!" }]}>
            <Input type="date" /> 
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input the address!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: "Please input the contact number!" }]}>
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
          <Form.Item name={["documents", "adhaarCard"]} label="Adhaar Card URL">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Managertab;
