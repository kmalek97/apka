import firebase from "firebase";
import { USER_OBSERVED_CHANGE } from "../constants";
import getCategories from "./getCategories";

const updateUser = () => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((snapshot) => {
        const data = {
          observedEbooks: snapshot.data()?.observedEbooks,
          observedAudiobooks: snapshot.data()?.observedAudiobooks,
        };
        dispatch({ type: USER_OBSERVED_CHANGE, payload: data });
        getCategories()(dispatch);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export default updateUser;
