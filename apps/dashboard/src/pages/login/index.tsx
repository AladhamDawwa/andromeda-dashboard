import { useState } from "react";

import * as Yup from "yup";
import { Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuthAPI } from "@/services";
import { useUserContext } from "@/context/user";

import { Button, Card } from "@andromeda/core/components";
import InputField from "@andromeda/core/elements/InputField";

import styles from "./styles.module.scss";

const LoginPage = () => {
  const { login } = useAuthAPI();
  const { handleLogin } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const initialValues = { username: "", password: "" };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await login(values);
      handleLogin(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { response } = error;
      toast.error(response?.data?.message[0] || "An error occurred", {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <InputField
                name="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
              />

              <InputField
                name="password"
                label="Password"
                type={passwordVisibility ? "text" : "password"}
                endIcon={
                  passwordVisibility ? (
                    <FaEyeSlash
                      style={{
                        color: "gray",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      style={{
                        color: "gray",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  )
                }
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              style={{ marginTop: "48px", width: "100%" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Formik>
      </Card>
    </div>
  );
};

export default LoginPage;
