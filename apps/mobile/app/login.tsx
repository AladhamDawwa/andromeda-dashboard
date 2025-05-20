import { useUserContext } from "@/context/user";
import { useAuthAPI } from "@/services";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuthAPI();
  const { handleLogin } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await login(values);
      await handleLogin(response);
      router.navigate("/(home)");
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
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.label}>Username</Text>
              <TextInput
                placeholder="Enter your username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                style={styles.input}
                autoCapitalize="none"
              />
              {touched.username && errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder={t("enterPassword")}
                  value={values.password}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.toggleIcon}
                >
                  <Feather
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  handleSubmit();
                }}
                onLongPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: "#f1f5f9",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 32,

    backgroundColor: "white",

    borderRadius: 10,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Shadow for Android
    elevation: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    // marginBottom: 8,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
  },
  error: {
    marginBottom: 8,
    marginTop: 8,
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlign: "left",
  },
  toggleIcon: {
    position: "absolute",
    insetInlineEnd: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  submitButton: {
    marginTop: 48,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#d90368",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
