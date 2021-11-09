import firebase from "firebase";
import { GET_AUDIOBOOKS_NEXT, GET_EBOOKS } from "../constants";
import { GET_AUDIOBOOKS } from "../constants";

const getFile = (option: string, lastElement?: any) => {
  const fileType = option === "audio" ? "audiobooks" : "ebooks";
  const query = firebase.firestore().collection(fileType).orderBy("creation");

  const getFunction = (
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
    dispatch: (arg0: { type: string; payload?: any }) => void,
    lastElement?: any
  ) => {
    const data = snapshot.docs;
    dispatch({
      type:
        option === "audio"
          ? !!lastElement
            ? GET_AUDIOBOOKS_NEXT
            : GET_AUDIOBOOKS
          : GET_EBOOKS,
      payload: data,
    });

    return snapshot.docs;
  };

  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    console.log("lastElement", lastElement);
    !lastElement
      ? query
          .limit(2)
          .get()
          .then((snapshot) => {
            getFunction(snapshot, dispatch);
          })
      : query
          .startAfter(lastElement || 0)
          .limit(1)
          .get()
          .then((snapshot) => {
            getFunction(snapshot, dispatch, lastElement);
          });
  };
};

export default getFile;
