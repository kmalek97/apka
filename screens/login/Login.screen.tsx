import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Yup from "yup";
import SelfActivityIndicator from "../../components/ActivityIndicator/SelfActivityIndicator";
import Wrapper from "../../components/Wrapper";
import { styles } from "./Login.styles";
import { ILoginProps } from "./Login.types";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login({ signInUser, route, isLoading }: ILoginProps) {
  const navigation = useNavigation();

  const handleOnSubmit = (values: any) => {
    signInUser(values, navigation);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SelfActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{
                email: "qwe@o2.pl",
                password: "qweqwe",
              }}
              validationSchema={schema}
              onSubmit={(values) => handleOnSubmit(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.wrapper}>
                  <TextInput
                    testID="test.email"
                    style={styles.input}
                    outlineColor="#E79A36"
                    label={
                      errors.email && touched.email ? errors.email : "email"
                    }
                    placeholder="email"
                    mode="outlined"
                    maxLength={30}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={!!(errors.email && touched.email)}
                  />
                  <TextInput
                    testID="test.password"
                    style={styles.input}
                    outlineColor="#E79A36"
                    label="password"
                    placeholder="password"
                    mode="outlined"
                    maxLength={30}
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={!!(errors.password && touched.password)}
                  />
                  {route.params?.wrongData ? (
                    <View style={styles.errorBottomTextWrapper}>
                      <Text style={styles.errorBottomText}>
                        Wrong data or account doesn't exist
                      </Text>
                    </View>
                  ) : null}
                  <Button
                    style={styles.button}
                    labelStyle={styles.buttonText}
                    onPress={handleSubmit}
                  >
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </Wrapper>
  );
}
