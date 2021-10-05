import firebase from "firebase";
import { LOADER_OFF, LOADER_ON, USER_DATA_CHANGE } from "../constants";
import { ISignInProps } from "./types";

const signInUser = (values: ISignInProps, navigation: any) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: LOADER_ON });

    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((data) => {
        firebase
          .firestore()
          .collection("users")
          .doc(data.user?.uid)
          .get()
          .then((snapshot) => {
            console.log("ddd", snapshot.data()?.role);
            const data = {
              role: snapshot.data()?.role,
              uid: firebase.auth().currentUser?.uid,
              email: firebase.auth().currentUser?.email,
            };
            dispatch({ type: LOADER_OFF });
            dispatch({ type: USER_DATA_CHANGE, payload: data });
          })
          .catch((error) => {
            dispatch({ type: LOADER_OFF });
            console.log("error", error);
          });
      })
      .catch((err) => {
        navigation.navigate("Login", { wrongData: true });
        console.log("error kurde: ", err);
        dispatch({ type: LOADER_OFF });
      });
  };
};

export default signInUser;
