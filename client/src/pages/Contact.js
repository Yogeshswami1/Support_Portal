

// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import {
//   Row,
//   Col,
//   Card,
//   Table,
//   message,
//   Button,
//   Modal,
//   Form,
//   Input,
//   DatePicker,
//   Select,
//   Upload,
//   Popconfirm,
// } from "antd";
// import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import axios from "axios";

// const { Option } = Select;
// const { confirm } = Modal;

// const initialContactData = [];

// function Contact() {
//   const [contacts, setContacts] = useState(initialContactData);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [currentContact, setCurrentContact] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/contact/get");
//       setContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       message.error("Failed to load data. Please try again.");
//     }
//   };

//   const handleView = (record) => {
//     setCurrentContact(record);
//     setIsModalVisible(true);
//     form.setFieldsValue({
//       ...record,
//       date: moment(record.date, "YYYY-MM-DD"),
//     });
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//     setCurrentContact(null);
//     form.resetFields();
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setCurrentContact(null);
//     form.resetFields();
//   };

//   const handleAddOrUpdateContact = async (values) => {
//     try {
//       if (currentContact) {
//         // Update existing contact
//         const response = await axios.put(`http://localhost:8000/api/contact/${currentContact._id}`, values);
//         setContacts(contacts.map(contact => contact._id === currentContact._id ? response.data : contact));
//         message.success("Contact updated successfully!");
//       } else {
//         // Add new contact
//         const response = await axios.post("http://localhost:8000/api/contact/add", values);
//         const newContact = {
//           ...response.data,
//           date: values.date.format("YYYY-MM-DD"),
//         };
//         setContacts([...contacts, newContact]);
//         message.success("Contact added successfully!");
//       }
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error(currentContact ? "Error updating contact:" : "Error adding contact:", error);
//       message.error(currentContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
//     }
//   };

//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
  
//     try {
//       setUploading(true);
//       const response = await axios.post("http://localhost:8000/api/contact/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setUploading(false);
//       setContacts([...contacts, ...response.data]);
//       message.success("File uploaded and contacts imported successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploading(false);
//       message.error("Failed to upload file and import contacts. Please try again.");
//     }
//   };
  
//   const uploadProps = {
//     name: "file",
//     beforeUpload: (file) => {
//       const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
//       if (!isCSV) {
//         message.error("You can only upload CSV files!");
//       }
//       return isCSV;
//     },
//     onChange: (info) => {
//       if (info.file.status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onRemove: () => {},
//     customRequest: ({ file }) => {
//       handleUpload(file);
//     },
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/contact/${id}`);
//       message.success("Contact deleted successfully");
//       fetchContacts();
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//       message.error("Failed to delete contact");
//     }
//   };

//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Service",
//       dataIndex: "service",
//       key: "service",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Primary Contact",
//       dataIndex: "primaryContact",
//       key: "primaryContact",
//     },
//     {
//       title: "Secondary Contact",
//       dataIndex: "secondaryContact",
//       key: "secondaryContact",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => handleView(record)} icon={<EditOutlined />} style={{ width: "4rem" }} />
//           <Popconfirm
//             title="Are you sure to delete this contact?"
//             icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
//             onConfirm={() => handleDelete(record._id)}
//           >
//             <Button type="link" danger icon={<DeleteOutlined />} style={{ width: "4rem" }} />
//           </Popconfirm>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="tabled">
//         <Row gutter={[24, 0]}>
//           <Col xs="24" xl={24}>
//             <Card
//               bordered={false}
//               className="criclebox tablespace mb-24"
//               title="Contact Us Table"
//               extra={
//                 <>
//                   <Upload {...uploadProps}>
//                     <Button icon={<UploadOutlined />} loading={uploading}>
//                       Upload CSV
//                     </Button>
//                   </Upload>
//                   <Button type="dashed" onClick={showModal} icon={<PlusOutlined />}>
//                     Add Contact
//                   </Button>
//                 </>
//               }
//             >
//               <div className="table-responsive">
//                 <Table columns={columns} dataSource={contacts} pagination={false} className="ant-border-space" />
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       <Modal
//         title={currentContact ? `Edit Contact - ${currentContact.name}` : "Add New Contact"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleAddOrUpdateContact} initialValues={currentContact}>
//           <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select a date!" }]}>
//             <DatePicker />
//           </Form.Item>
//           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="service" label="Service" rules={[{ required: true, message: "Please input the service!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="primaryContact"
//             label="Primary Contact"
//             rules={[{ required: true, message: "Please input the primary contact!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="secondaryContact"
//             label="Secondary Contact"
//             rules={[{ required: true, message: "Please input the secondary contact!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {currentContact ? "Save Changes" : "Add Contact"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// }

// export default Contact;


import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Popconfirm,
} from "antd";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

const initialContactData = [];

function Contact() {
  const [contacts, setContacts] = useState(initialContactData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/contact/get");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data. Please try again.");
    }
  };

  const handleView = (record) => {
    setCurrentContact(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
      date: moment(record.date, "YYYY-MM-DD"),
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
    setCurrentContact(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentContact(null);
    form.resetFields();
  };

  const handleAddOrUpdateContact = async (values) => {
    try {
      if (currentContact) {
        // Update existing contact
        const response = await axios.put(`http://localhost:8000/api/contact/${currentContact._id}`, values);
        setContacts(contacts.map(contact => contact._id === currentContact._id ? response.data : contact));
        message.success("Contact updated successfully!");
      } else {
        // Add new contact
        const response = await axios.post("http://localhost:8000/api/contact/add", values);
        const newContact = {
          ...response.data,
          date: values.date.format("YYYY-MM-DD"),
        };
        setContacts([...contacts, newContact]);
        message.success("Contact added successfully!");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error(currentContact ? "Error updating contact:" : "Error adding contact:", error);
      message.error(currentContact ? "Failed to update contact. Please try again." : "Failed to add contact. Please try again.");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8000/api/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);
      setContacts([...contacts, ...response.data]);
      message.success("File uploaded and contacts imported successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      message.error("Failed to upload file and import contacts. Please try again.");
    }
  };

  const uploadProps = {
    name: "file",
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
      if (!isCSV) {
        message.error("You can only upload CSV files!");
      }
      return isCSV;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: ({ file }) => {
      handleUpload(file);
    },
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/contact/${id}`);
      message.success("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      message.error("Failed to delete contact");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleView(record)} icon={<EditOutlined />} style={{ width: "4rem" }} />
          <Popconfirm
            title="Are you sure to delete this contact?"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} style={{ width: "4rem" }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Contact Us Table"
              extra={
                <>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} loading={uploading}>
                      Upload CSV
                    </Button>
                  </Upload>
                  <Button type="dashed" onClick={showModal} icon={<PlusOutlined />}>
                    Add Contact
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table columns={columns} dataSource={contacts} pagination={false} className="ant-border-space" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title={currentContact ? `Edit Contact - ${currentContact.name}` : "Add New Contact"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdateContact} initialValues={currentContact}>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select a date!" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="service" label="Service" rules={[{ required: true, message: "Please input the service!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="primaryContact"
            label="Primary Contact"
            rules={[{ required: true, message: "Please input the primary contact!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="secondaryContact"
            label="Secondary Contact"
            rules={[{ required: true, message: "Please input the secondary contact!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentContact ? "Save Changes" : "Add Contact"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Contact;
