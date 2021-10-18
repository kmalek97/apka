import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import Wrapper from "../../components/Wrapper";
import { styles } from "./Register.styles";
import { IRegisterValues } from "../../redux/actions/types";
import SelfActivityIndicator from "../../components/ActivityIndicator/SelfActivityIndicator";
import { IRegisterProps } from "./Register.types";

const schema = Yup.object().shape({
  nickname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Register = ({ isLoading, route, registerUser }: IRegisterProps) => {
  const navigation = useNavigation();

  const handleOnSubmit = (values: IRegisterValues) => {
    registerUser(values, navigation);
  };

  const errorMessageText = (route: any) => {
    if (route === "email") {
      return (
        <View style={styles.errorBottomTextWrapper}>
          <Text style={styles.errorBottomText}>
            That email address is already in use!
          </Text>
        </View>
      );
    }
    if (route === "connection") {
      return (
        <View style={styles.errorBottomTextWrapper}>
          <Text style={styles.errorBottomText}>Connection Error!</Text>
        </View>
      );
    }
  };

  return (
    <Wrapper>
      <ScrollView>
        <View style={styles.formContainer}>
          {isLoading ? (
            <SelfActivityIndicator />
          ) : (
            <Formik
              initialValues={{
                nickname: "qwe",
                email: "qwe@o2.pl",
                password: "123456",
                confirmPassword: "123456",
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
                    style={styles.input}
                    outlineColor="#E79A36"
                    label={
                      errors.nickname && touched.nickname
                        ? errors.nickname
                        : "nickname"
                    }
                    placeholder="nickname"
                    mode="outlined"
                    maxLength={30}
                    value={values.nickname}
                    onChangeText={handleChange("nickname")}
                    onBlur={handleBlur("nickname")}
                    error={!!(errors.nickname && touched.nickname)}
                  />
                  <TextInput
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
                  <TextInput
                    outlineColor="#E79A36"
                    style={styles.input}
                    label={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : "confirm password"
                    }
                    placeholder="confirm password"
                    mode="outlined"
                    maxLength={30}
                    secureTextEntry={true}
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={!!errors.confirmPassword && touched.confirmPassword}
                  />
                  {errorMessageText(route?.params?.wrongData)}
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
          )}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Register;
