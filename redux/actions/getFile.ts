import firebase from "firebase";
import { GET_AUDIOBOOKS_NEXT, GET_EBOOKS, GET_EBOOKS_NEXT } from "../constants";
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
          : !!lastElement
            ? GET_EBOOKS_NEXT
            : GET_EBOOKS,
      payload: data,
    });

    return snapshot.docs;
  };

  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
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
