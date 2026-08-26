import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { View, TextInput, TouchableOpacity } from "react-native";

import Text from "./Text";
import theme from "../utils/theme";
import styles from "../utils/styles";
import { CREATE_REVIEW } from "../graphql/mutations";

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required("Repository owner\"s username is required"),
  repositoryName: Yup.string()
    .required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Minimum rating is 0")
    .max(100, "Maximum rating is 100"),
  text: Yup.string()
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: ""
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text
          }
        }
      });

      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log("Review creation failed:", e);
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Repository owner's username"
            placeholderTextColor={theme.colors.grey}
            value={values.ownerName}
            onChangeText={handleChange("ownerName")}
            style={[
              styles.input,
              touched.ownerName && errors.ownerName && styles.errorInput
            ]}
          />
          {touched.ownerName && errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

          <TextInput
            placeholder="Repository name"
            placeholderTextColor={theme.colors.grey}
            value={values.repositoryName}
            onChangeText={handleChange("repositoryName")}
            style={[
              styles.input,
              touched.repositoryName && errors.repositoryName && styles.errorInput
            ]}
          />
          {touched.repositoryName && errors.repositoryName && <Text style={styles.errorText}>{errors.repositoryName}</Text>}

          <TextInput
            placeholder="Rating between 0 and 100"
            placeholderTextColor={theme.colors.grey}
            value={values.rating}
            onChangeText={handleChange("rating")}
            keyboardType="numeric"
            style={[
              styles.input,
              touched.rating && errors.rating && styles.errorInput
            ]}
          />
          {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

          <TextInput
            placeholder="Review (optional)"
            placeholderTextColor={theme.colors.grey}
            value={values.text}
            onChangeText={handleChange("text")}
            multiline
            style={[styles.input, styles.multiline]}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;