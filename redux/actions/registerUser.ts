import firebase from "firebase";
import { LOADER_OFF, LOADER_ON } from "../constants";
import { IRegisterValues } from "./types";

const registerUser = (values: IRegisterValues, navigation: any) => {
  return (dispatch: (arg0: { type: string }) => void) => {
    if (values.password !== values.confirmPassword) {
      console.log("error");
    }

    const data = {
      nickname: values.nickname,
      email: values.email,
      role: "user",
    };

    const navigationError = (err: string) => {
      navigation.navigate("Register", {
        wrongData: err,
      });
    };

    dispatch({ type: LOADER_ON });

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          firebase
            .firestore()
            .collection("users")
            .doc(res.user?.uid)
            .set(data)
            .then(() => {
              console.log("user saved");
              dispatch({ type: LOADER_OFF });
            })
            .catch((err) => {
              console.log(err);
              dispatch({ type: LOADER_OFF });
              navigationError("connection");
            });
        })
        .catch((error) => {
          if (error.code === "auth/network-request-failed") {
            dispatch({ type: LOADER_OFF });
            navigationError("connection");
          }

          if (error.code === "auth/email-already-in-use") {
            navigationError("email");
            dispatch({ type: LOADER_OFF });
          }

          if (error.code === "auth/invalid-email") {
            dispatch({ type: LOADER_OFF });
            console.log("That email address is invalid!");
          }

          console.error(error);
        });
    } catch (error) {
      dispatch({ type: LOADER_OFF });
      navigationError("connection");
    }
  };
};

export default registerUser;
