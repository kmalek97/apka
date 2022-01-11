import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import * as firebase from "firebase";
// import { getFunctions } from "firebase/functions";
import { StripeProvider } from "@stripe/stripe-react-native";

import AplicationNavigation from "./components/AplicationNavigation";

var firebaseConfig = {
  apiKey: "AIzaSyAEzbWm3_D-9LuA6qNGw-MDeg6LYsDGoCw",
  authDomain: "library-8e9d1.firebaseapp.com",
  projectId: "library-8e9d1",
  storageBucket: "library-8e9d1.appspot.com",
  messagingSenderId: "308073493480",
  appId: "1:308073493480:web:eac3aebec6637ad19fea5d",
  measurementId: "G-8QX7WSX3PN",
};
// Initialize Firebase
if (firebase.default.apps.length === 0) {
  const app = firebase.default.initializeApp(firebaseConfig);
  // firebase.default.functions.;
  // getFunctions(app);
}

function App() {
  return (
    <StripeProvider publishableKey="pk_test_51JwRDeI4IOxw6fNyLVSM5MLoIHELFJ6VatMjL584hZE4ZrkStNswDuINmjvcURfOdhIVF7m6U0MpJCQCEeGm2vcy00UUpYgvS4">
      <Provider store={store}>
        <AplicationNavigation />
      </Provider>
    </StripeProvider>
  );
}

export default App;
