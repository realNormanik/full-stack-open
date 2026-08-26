import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { View, TextInput, TouchableOpacity } from "react-native";

import Text from "./Text";
import theme from "../utils/theme";
import styles from "../utils/styles";
import useSignIn from "../hooks/useSignIn";
import { CREATE_USER } from "../graphql/mutations";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username can't be longer than 30 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password can't be longer than 50 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.form}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={theme.colors.grey}
            value={values.username}
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            style={[
              styles.input,
              touched.username && errors.username && styles.errorInput,
            ]}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.colors.grey}
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            style={[
              styles.input,
              touched.password && errors.password && styles.errorInput,
            ]}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={theme.colors.grey}
            secureTextEntry
            value={values.passwordConfirmation}
            onChangeText={handleChange("passwordConfirmation")}
            onBlur={handleBlur("passwordConfirmation")}
            style={[
              styles.input,
              touched.passwordConfirmation &&
                errors.passwordConfirmation &&
                styles.errorInput,
            ]}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
