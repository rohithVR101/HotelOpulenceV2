"use client";

import { useUserStore } from "@/store/UserStore";
import Header from "../components/Header";
import RoomCard from "../components/RoomCard";
import Stack from "@mui/joy/Stack";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

import styles from "./page.module.css";
import { Button, Typography, CircularProgress } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingStages from "../components/BookingStages";

export default function Booking() {
  const store = useUserStore();
  const router = useRouter();

  const [progress, setProgress] = useState<
    "in-progress" | "processing" | "complete"
  >("in-progress");

  const [formData, setFormData] = useState({
    fullName: store.currentUser?.displayName || "",
    email: store.currentUser?.email || "",
    phoneNumber: store.currentUser?.phoneNumber || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Booking confirmed with details:", formData);
      setProgress("processing");
      setTimeout(() => {
        setProgress("complete");
      }, 2000);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.fullName) {
      errors = { ...errors, fullName: "First name is required" };
    }
    if (!formData.email) {
      errors = { ...errors, email: "Email is required" };
    }
    if (!formData.phoneNumber) {
      errors = { ...errors, phoneNumber: "Phone number is required" };
    }

    return errors;
  };

  if (progress === "processing") {
    return (
      <>
        <Header />
        <div className={styles.bookingContainer}>
          <CircularProgress />;
        </div>
      </>
    );
  }

  if (progress === "complete") {
    return (
      <>
        <Header />
        <div className={styles.bookingContainer}>
          <div style={{ width: "100%", height: "100%" }}>
            <Typography level="h1">Booking Confirmed</Typography>
            <Typography level="body-md">
              Your booking has been confirmed. We look forward to welcoming you!
            </Typography>
            <div className={styles.buttonGroup}>
              <Button
                variant="solid"
                color="primary"
                onClick={() => router.push("/")}
              >
                Back to Home
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() => router.push("/bookings")}
              >
                Check your Booking Details
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <BookingStages currentStep="confirmation" />
      <h1 className={styles.bookingTitle}>Complete Your Booking</h1>
      <div className={styles.bookingContainer}>
        <div className={styles.userDetailsConfirmation}>
          {store.currentUser ? (
            <div className={styles.userDetails}>
              <h3 className={styles.userDetailsTitle}>Confirm your Details</h3>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <>
                    <FormLabel htmlFor="fullName">Primary Guest</FormLabel>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <Typography
                      level="body-sm"
                      startDecorator={<InfoOutlined />}
                    >
                      Please ensure that the details provided are correct. We
                      will send you a confirmation email and SMS with your
                      booking details.
                    </Typography>
                  </>
                  <Button variant="solid" color="primary" type="submit">
                    Confirm Booking
                  </Button>
                </Stack>
              </form>
            </div>
          ) : (
            <div className={styles.userDetails}>
              <Typography level="body-sm">
                Please log in to see your booking details.
              </Typography>
              <Button
                variant="solid"
                color="primary"
                onClick={() => router.push("/log-in")}
              >
                {" "}
                Log In
              </Button>
            </div>
          )}
        </div>
        <div className={styles.bookingContent}>
          {store.userSelection && store.userSelection.room && (
            <RoomCard
              cardType="selected"
              roomDetails={store.userSelection.room}
            />
          )}
        </div>
      </div>
    </>
  );
}
