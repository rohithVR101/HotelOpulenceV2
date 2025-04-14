"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import styles from "./page.module.css";
import Stack from "@mui/joy/Stack";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { createNewUserWithEmailAndPassword } from "@/auth/FirebaseAuthenticationHelper";

function SignUp() {
  let router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      createNewUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          router.push("/log-in");
        })
        .catch((error) => {
          setErrors(error.message);
        })
        .finally(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
        });
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.firstName) {
      errors = { ...errors, firstName: "First name is required" };
    }
    if (!formData.lastName) {
      errors = { ...errors, lastName: "Last name is required" };
    }
    if (!formData.email) {
      errors = { ...errors, email: "Email is required" };
    }
    if (!formData.password) {
      errors = { ...errors, password: "Password is required" };
    }
    if (formData.password !== formData.confirmPassword) {
      errors = { ...errors, confirmPassword: "Passwords do not match" };
    }
    if (formData.password.length < 8) {
      errors = {
        ...errors,
        password: "Password must be at least 8 characters long",
      };
    }

    return errors;
  };

  return (
    <>
      <Header />
      <div className={styles.form}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {/* {errors.firstName && <span>{errors.firstName}</span>} */}

              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {/* {errors.lastName && <span>{errors.lastName}</span>} */}

              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {/* {errors.email && <span>{errors.email}</span>} */}

              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {/* {errors.password && <span>{errors.password}</span>} */}

              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {/* {errors.confirmPassword && <span>{errors.confirmPassword}</span>} */}
            </>
          </Stack>
          <div className={styles.buttonGroup}>
            <Button type="submit">Sign Up</Button>
            <Button
              onClick={() => {
                router.push("/log-in");
              }}
            >
              Already have an account? Log In!
            </Button>
          </div>
        </form>
      </div>
      {Object.keys(errors).length > 0 && (
        <FormHelperText className={styles.error}>
          <InfoOutlined />
          <span>{Object.values(errors).join(", ")}</span>
        </FormHelperText>
      )}
    </>
  );
}

export default SignUp;
