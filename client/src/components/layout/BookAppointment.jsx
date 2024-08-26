import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { useEffect } from "react";
import StepLabel from "@mui/material/StepLabel";

import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  notification,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState } from "react";

dayjs.extend(customParseFormat);

const steps = ["Details", "Services", "Time and date"];
const dropDownStyle = {
  width: 470,
};

const timeSlots = [
  "10:05",
  "10:10",
  "10:15",
  "10:20",
  "10:25",
  "10:30",
  "10:35",
  "10:40",
  "10:45",
  "10:50",
  "11:00",
  "11:10",
  "11:20",
  "11:30",
  "11:40",
  "11:50",
  "12:00",
  "12:10",
  "12:20",
  "12:30",
  "12:40",
  "12:50",
  "13:00",
  "13:10",
  "13:20",
  "13:30",
  "13:40",
  "13:50",
  "14:00",
  "14:10",
  "14:20",
  "14:30",
  "14:40",
  "14:50",
];

export default function BookAppointment() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  const [selectedPlatform, setSelectedPlatform] = useState({});
  const [appointments, setAppointments] = useState([]);

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

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleFinish = (values) => {
    console.log("Form values:", values);

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= twentyFourHoursAgo && appointmentDate <= now;
    });

    // Check if the user has already booked 3 or more appointments
    if (recentAppointments.length >= 3) {
      openNotificationWithIcon(
        "error",
        "Booking Limit Reached",
        "You can only book 3 appointments within a 24-hour period. Please try again later."
      );
      return; // Prevent booking
    }

    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
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

  const [form] = Form.useForm();

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/support/getappointments",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        // Sort the appointments by date in descending order
        const sortedAppointments = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAppointments(sortedAppointments);
      } else {
        console.error("Error: API response is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
    getPlatform();
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    enrollment: "",
    platform: "",
    manager: "",
    description: "",
    date: null,
    time: null,
    ad: "",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    enrollment: "",
    platform: "",
    manager: "",
    description: "",
    date: "",
    time: "",
    ad: "",
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      history.push("/supportuserdashboard");
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      await handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const history = useHistory();
  const handleReset = () => {
    history.push("/supportuserdashboard");
    setActiveStep(0);
    setErrors({
      name: "",
      email: "",
      number: "",
      subject: "",
      enrollment: "",
      platform: "",
      manager: "",
      description: "",
      date: "",
      time: "",
      ad: "",
    });
  };

  const handleChange = (e) => {
    console.log(`Field name: ${e.target.name}, Value: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step) => {
    let valid = true;
    let newErrors = { ...errors };

    switch (step) {
      case 0:
        if (!formData.name) {
          newErrors.name = "Please enter your full name";
          valid = false;
        }
        if (!formData.email) {
          newErrors.email = "Please enter your email";
          valid = false;
        }
        if (!formData.number) {
          newErrors.number = "Please enter your phone number";
          valid = false;
        }
        if (!formData.subject) {
          newErrors.subject = "Please enter your subject";
          valid = false;
        }
        break;
      case 1:
        if (!formData.enrollment) {
          newErrors.enrollment = "Please enter your enrollment number";
          valid = false;
        }
        if (!formData.platform) {
          newErrors.platform = "Please choose your platform";
          valid = false;
        }
        if (!formData.manager) {
          newErrors.manager = "Please choose your manager";
          valid = false;
        }
        if (!formData.description) {
          newErrors.description = "Please enter the description";
          valid = false;
        }
        break;
      case 2:
        if (!formData.date) {
          newErrors.date = "Please select a date";
          valid = false;
        }
        if (!formData.time) {
          newErrors.time = "Please select a time";
          valid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleSubmit = async () => {
  //   console.log("Form Data:", formData);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/support/appointmentRoute",
  //       formData
  //     );
  //     console.log("Appointment booked successfully", response.data);
  //     openNotificationWithIcon(
  //       "success",
  //       "Appointment Booked",
  //       "Your appointment has been successfully booked."
  //     );
  //   } catch (error) {
  //     console.error("Error booking appointment", error);
  //     openNotificationWithIcon(
  //       "error",
  //       "Failed",
  //       "Your appointment couldn't be booked at this time, please try again."
  //     );
  //   }
  // };

  const handleSubmit = async () => {
    const now = new Date();

    // Filter the appointments to include only those booked on the same day
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const todayAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= startOfDay && appointmentDate <= now;
    });

    // Check if the user has already booked 3 or more appointments today
    if (todayAppointments.length >= 3) {
      openNotificationWithIcon(
        "error",
        "Booking Limit Reached",
        "You can only book 3 appointments within a day. Please try again tomorrow."
      );
      return; // Prevent booking
    }

    console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/support/appointmentRoute",
        formData
      );
      console.log("Appointment booked successfully", response.data);
      openNotificationWithIcon(
        "success",
        "Appointment Booked",
        "Your appointment has been successfully booked."
      );
      getAppointments(); // Update the appointments list
    } catch (error) {
      console.error("Error booking appointment", error);
      openNotificationWithIcon(
        "error",
        "Failed",
        "Your appointment couldn't be booked at this time, please try again."
      );
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div
            style={{
              padding: "0 20px 10px 20px",
              marginTop: "20px",
            }}
          >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item
                style={{ width: "75%" }}
                name="name"
                label="Full Name"
                required
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ width: "75%" }}
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ width: "75%" }}
                name="number"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input
                  type="tel"
                  name="number"
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ width: "75%" }}
                name="subject"
                label="Subject"
                rules={[
                  { required: true, message: "Please enter your subject" },
                ]}
              >
                <Input
                  type="text"
                  name="subject"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </Form.Item>
            </Form>
          </div>
        );
      case 1:
        return (
          <div style={{ padding: "0 20px 10px 20px" }}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item
                style={{ width: "75%" }}
                name="enrollment"
                label="Enrollment Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your enrollment number",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="enrollment"
                  onChange={(e) =>
                    setFormData({ ...formData, enrollment: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ width: "75%" }}
                name="platform"
                label="Platform"
                rules={[
                  { required: true, message: "Please choose your platform!" },
                ]}
              >
                <Select
                  placeholder="Choose your platform"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setFormData({ ...formData, platform: value });
                    const platform = platforms.find((ar) => ar._id === value);

                    setSelectedPlatform(platform);
                  }}
                  options={platforms.map((platform) => ({
                    value: platform._id,
                    label: platform.platform,
                  }))}
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
                style={{ width: "75%" }}
                name="manager"
                label="Managers"
                rules={[
                  { required: true, message: "Please choose your managers!" },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Choose your manager"
                  onChange={(manager) =>
                    setFormData({ ...formData, manager: manager })
                  }
                  options={selectedPlatform?.managers?.map((option) => ({
                    value: option.name,
                    label: option.name,
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
                style={{ width: "75%" }}
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter the description" },
                ]}
              >
                <Input.TextArea
                  name="description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Item>
            </Form>
          </div>
        );
      case 2:
        return (
          <div style={{ padding: "0 20px 10px 20px" }}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item
                style={{ width: "75%" }}
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker
                  style={{ width: "75%" }}
                  name="date"
                  onChange={(date) => setFormData({ ...formData, date: date })}
                  disabledDate={(current) => {
                    // Disable all past dates and dates more than 2 days in the future
                    const today = dayjs();
                    const twoDaysLater = dayjs().add(2, "day");
                    return (
                      current &&
                      (current < today.startOf("day") ||
                        current > twoDaysLater.endOf("day"))
                    );
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                name="time"
                label="Time"
                rules={[{ required: true, message: "Please select a time" }]}
              >
                <Radio.Group
                  style={{ width: "100%" }}
                  name="time"
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                >
                  {timeSlots
                    ?.filter((slot) => {
                      let splittedSlots = slot.split(":");
                      let currTime = new Date();
                      let slotTime = new Date(
                        new Date().setHours(splittedSlots[0], splittedSlots[1])
                      );
                      return slotTime.getTime() >= currTime.getTime();
                    })
                    .map((slot) => (
                      <Radio.Button key={slot} value={slot}>
                        {slot}
                      </Radio.Button>
                    ))}
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "70%", marginTop: "50px", marginBottom: "40px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  width: "120px",
                  fontWeight: "bold",
                }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  width: "120px",
                  fontWeight: "bold",
                }}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
