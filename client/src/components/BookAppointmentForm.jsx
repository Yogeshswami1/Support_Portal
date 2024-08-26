import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  notification,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BookAppointmentForm = () => {
  dayjs.extend(customParseFormat);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const buttonStyle = {
    backgroundColor: "#5A51C1",
    color: "White",
    borderRadius: "20px",
    fontWeight: "bold",

    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  const dropDownStyle = {
    width: 470,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };
  const history = useHistory();

  const hancleButtonClick = () => {
    history.push("/supportuserbookappointment");
  };

  const handleFinish = (values) => {
    console.log("Form values:", values);

    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("HH:mm:ss"),
    };

    axios
      .post(
        "http://localhost:5000/api/support/appointmentRoute",
        formattedValues,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsModalVisible(false);
        form.resetFields();
        openNotificationWithIcon(
          "success",
          "Appointment Booked",
          "Your appointment has been successfully booked."
        );
      })
      .catch((error) => {
        console.error(error);
        openNotificationWithIcon(
          "error",
          "Booking Failed",
          "There was an error booking your appointment. Please try again."
        );
      });
  };

  const arr = [
    { title: "flipkart", options: ["1", "2", "3"] },
    { title: "flipkart1", options: ["4", "5", "6"] },
    { title: "flipkart2", options: ["7", "8", "9"] },
  ];

  const [selectedPlatform, setSelectedPlatform] = useState({
    title: "flipkart1",
    options: ["4", "5", "6"],
  });

  return (
    <div>
      <Button style={buttonStyle} type="primary" onClick={hancleButtonClick}>
        BOOK APPOINTMENT
      </Button>
      <Modal
        title="BOOK YOUR APPOINTMENT"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
                type: "email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please enter your subject!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="enrollment"
            label="Enrollment Number"
            rules={[
              {
                required: true,
                message: "Please enter your Enrollment number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="platform"
            label="Platform"
            rules={[
              { required: true, message: "Please choose your platform!" },
            ]}
          >
            <Select
              placeholder="Choose your platform"
              style={dropDownStyle}
              onChange={(value) => {
                console.log(value);
                const platform = arr.find((ar) => ar.title === value);
                setSelectedPlatform(platform);
              }}
              options={arr.map((ar) => ({ value: ar.title, label: ar.title }))}
              // options={[
              //   { label: "Amazon.com", value: "amazon.com" },
              //   { label: "Flipkart", value: "flipkart" },
              //   { label: "Meesho", value: "meesho" },
              //   { label: "Etsy", value: "etsy" },
              //   { label: "Amazon India", value: "amazon-india" },
              //   { label: "Website", value: "website" },
              // ]}
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please select a date of appointment!",
              },
            ]}
          >
            <DatePicker style={dropDownStyle} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please choose the time!" }]}
          >
            <TimePicker
              style={dropDownStyle}
              onChange={(time, timeString) => console.log(time, timeString)}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </Form.Item>

          <Form.Item
            name="manager"
            label="Managers"
            rules={[
              { required: true, message: "Please choose your managers!" },
            ]}
          >
            <Select
              style={dropDownStyle}
              placeholder="Choose your manager"
              options={selectedPlatform?.options?.map((option) => ({
                label: option,
                value: option,
              }))}
              // options={[
              //   { label: "SM1(Manish)", value: "sm1(manish)" },
              //   { label: "Mukesh", value: "mukesh" },
              //   { label: "Charu", value: "charu" },
              //   { label: "Yogendra", value: "yogendra" },
              //   { label: "Dipanshu", value: "dipanshu" },
              //   { label: "SM6(Ujwal)", value: "sm6(ujwal)" },
              //   {
              //     label: "TEAM Leader7(Ramesh)",
              //     value: "team-leader7(ramesh)",
              //   },
              //   { label: "Dinesh", value: "dinesh" },
              //   {
              //     label: "Team Leader 4 (Rahul)",
              //     value: "team-leader4(rahul)",
              //   },
              //   { label: "Prakash(Amazon.in)", value: "Prakash(Amazon.in)" },
              //   { label: "Team Leader 3 (Ritu)", value: "team-leader3(ritu)" },
              //   { label: "SMB (Uzair)", value: "smb(uzair)" },
              //   { label: "SM 13 (Akhil)", value: "sm13(akhil)" },
              // ]}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter some description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ background: "#353979" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookAppointmentForm;

// import React, { useState } from "react";
// import {
//   Button,
//   Modal,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   TimePicker,
//   notification,
// } from "antd";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import axios from "axios";

// const BookAppointmentForm = () => {
//   dayjs.extend(customParseFormat);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();

//   const buttonStyle = {
//     backgroundColor: "#353979",
//     color: "White",
//     borderRadius: "20px",
//     fontWeight: "bold",
//     boxShadow:
//       "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//   };

//   const dropDownStyle = {
//     width: 470,
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const openNotificationWithIcon = (type, message, description) => {
//     notification[type]({
//       message,
//       description,
//       style: { marginTop: 120 },
//     });
//   };

//   const handleFinish = (values) => {
//     console.log("Form values:", values);

//     const formattedValues = {
//       ...values,
//       date: values.date.format("YYYY-MM-DD"),
//       time: values.time.format("HH:mm:ss"),
//     };

//     axios
//       .post(
//         "http://localhost:5000/api/support/appointmentRoute",
//         formattedValues,
//         {
//           headers: { Authorization: localStorage.getItem("token") },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setIsModalVisible(false);
//         form.resetFields();
//         openNotificationWithIcon(
//           "success",
//           "Appointment Booked",
//           "Your appointment has been successfully booked."
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//         openNotificationWithIcon(
//           "error",
//           "Booking Failed",
//           "There was an error booking your appointment. Please try again."
//         );
//       });
//   };

//   return (
//     <div>
//       <Button style={buttonStyle} type="primary" onClick={showModal}>
//         BOOK APPOINTMENT
//       </Button>
//       <Modal
//         title="BOOK YOUR APPOINTMENT"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleFinish}>
//           <Form.Item
//             name="name"
//             label="Full Name"
//             rules={[
//               { required: true, message: "Please enter your full name!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="number"
//             label="Phone Number"
//             rules={[
//               { required: true, message: "Please enter your phone number!" },
//             ]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your email!",
//                 type: "email",
//               },
//             ]}
//           >
//             <Input type="email" />
//           </Form.Item>
//           <Form.Item
//             name="subject"
//             label="Subject"
//             rules={[{ required: true, message: "Please enter your subject!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="enrollment"
//             label="Enrollment Number"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your Enrollment number!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="platform"
//             label="Platform"
//             rules={[
//               { required: true, message: "Please choose your platform!" },
//             ]}
//           >
//             <Select
//               placeholder="Choose your platform"
//               style={dropDownStyle}
//               options={[
//                 { label: "Amazon.com", value: "amazon.com" },
//                 { label: "Flipkart", value: "flipkart" },
//                 { label: "Meesho", value: "meesho" },
//                 { label: "Etsy", value: "etsy" },
//                 { label: "Amazon India", value: "amazon-india" },
//                 { label: "Website", value: "website" },
//               ]}
//             />
//           </Form.Item>
//           <Form.Item
//             name="date"
//             label="Date"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select a date of appointment!",
//               },
//             ]}
//           >
//             <DatePicker style={dropDownStyle} />
//           </Form.Item>
//           <Form.Item
//             name="time"
//             label="Time"
//             rules={[{ required: true, message: "Please choose the time!" }]}
//           >
//             <TimePicker
//               style={dropDownStyle}
//               onChange={(time, timeString) => console.log(time, timeString)}
//               defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
//             />
//           </Form.Item>

//           <Form.Item
//             name="manager"
//             label="Managers"
//             rules={[
//               { required: true, message: "Please choose your managers!" },
//             ]}
//           >
//             <Select
//               style={dropDownStyle}
//               placeholder="Choose your manager"
//               options={[
//                 { label: "SM1(Manish)", value: "sm1(manish)" },
//                 { label: "Mukesh", value: "mukesh" },
//                 { label: "Charu", value: "charu" },
//                 { label: "Yogendra", value: "yogendra" },
//                 { label: "Dipanshu", value: "dipanshu" },
//                 { label: "SM6(Ujwal)", value: "sm6(ujwal)" },
//                 {
//                   label: "TEAM Leader7(Ramesh)",
//                   value: "team-leader7(ramesh)",
//                 },
//                 { label: "Dinesh", value: "dinesh" },
//                 {
//                   label: "Team Leader 4 (Rahul)",
//                   value: "team-leader4(rahul)",
//                 },
//                 { label: "Prakash(Amazon.in)", value: "Prakash(Amazon.in)" },
//                 { label: "Team Leader 3 (Ritu)", value: "team-leader3(ritu)" },
//                 { label: "SMB (Uzair)", value: "smb(uzair)" },
//                 { label: "SM 13 (Akhil)", value: "sm13(akhil)" },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[
//               { required: true, message: "Please enter some description!" },
//             ]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               style={{ background: "#353979" }}
//               type="primary"
//               htmlType="submit"
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BookAppointmentForm;
