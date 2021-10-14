import firebase from "firebase";
import { GET_CATEGORIES_SUCCESS } from "../constants";

const getCategories = () => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    firebase
      .firestore()
      .collection("categories")
      .get()
      .then((snapshot) => {
        const data: { id: number }[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: Number(doc.id),
        }));
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
        return snapshot.docs.map((doc) => doc.data());
      });
  };
};

export default getCategories;
