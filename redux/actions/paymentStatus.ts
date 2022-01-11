import firebase from "firebase";
import { GET_PAYMENT_STATUS } from "../constants";

const paymentStatus = () => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      firebase
        .auth()
        .currentUser?.getIdTokenResult(true)
        .then((result) => {
          const data = result.claims?.stripeRole;
          dispatch({ type: GET_PAYMENT_STATUS, payload: data });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export default paymentStatus;
