"use client";
import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Header from "@/app/components/Header";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
} from "@/auth/FirebaseAuthenticationHelper";

function SignIn() {
  const userStore = useUserStore();
  let router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

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
      loginWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Perform your custom validation logic here

    return errors;
  };

  const signInWithGoogle = async () => {
    await loginWithGoogle()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className={styles.form}>
        <h2 className={styles.title}>Log In</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <div>
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
            </div>
            <div>
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
            </div>
          </Stack>
          <div className={styles.buttonGroup}>
            <Button type="submit">Log In</Button>
            <Button onClick={signInWithGoogle}>Sign In With Google</Button>
            <Button
              onClick={() => {
                router.push("/sign-up");
              }}
            >
              New around here? Sign Up!
            </Button>
          </div>
        </form>
        {error.length > 0 && (
          <FormHelperText className={styles.error}>
            <InfoOutlined />
            <span>{error}</span>
          </FormHelperText>
        )}
      </div>
    </>
  );
}

export default SignIn;
