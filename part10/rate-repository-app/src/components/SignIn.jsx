import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import { View, TextInput, TouchableOpacity } from "react-native";

import Text from "./Text";
import theme from "../utils/theme";
import styles from "../utils/styles";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate(); 
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log("Mutation result:", data);
      navigate("/");
    } catch (e) {
      console.error("Mutation error:", e);
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
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched
      }) => (
        <View style={styles.form}>
          <TextInput
            placeholder="Username"
            value={values.username}
            placeholderTextColor={theme.colors.grey}
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            style={[
              styles.input,
              touched.username && errors.username && styles.errorInput
            ]}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            placeholder="Password"
            value={values.password}
            placeholderTextColor={theme.colors.grey}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry
            style={[
              styles.input,
              touched.password && errors.password && styles.errorInput
            ]}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;