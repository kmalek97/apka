import {
  CardField,
  CardFieldInput,
  PaymentMethodCreateParams,
  useStripe,
} from "@stripe/stripe-react-native";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text } from "react-native-paper";
import base64 from "base-64";

const API_URL = "http://localhost:3000";

const Payment = () => {
  const { confirmPayment } = useStripe();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    const uidd = await firebase.auth().currentUser?.uid;

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      await firebase
        .firestore()
        .collection("users")
        .doc(uidd)
        .collection("checkout_sessions")
        .add({
          client: "mobile",
          mode: "payment",
          amount: 1099,
          currency: "eur",
        });
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const fetchPaymentIntentClientSecret = async () => {
    console.log("test2");
    const details = {
      amount: 200,
      currency: "pln",
    };
    var formBody: string[] = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const bodyRequest = formBody.join("&");
    console.log("hehe: ", bodyRequest);
    const response = await fetch(`https://api.stripe.com/v1/payment_intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic c2tfdGVzdF81MUp3UkRlSTRJT3h3NmZOeTh3WnZ2QndVaHZPN2NuaFQ3UUFmQWMwZktNMmlBdDRiZXcyMHB3d1BEWmpGMjNHVEZQdEc5eXd2emVQSmlBdk5aMHhiUVZ5bjAwcjI2V3JYZEs6",
      },
      body: bodyRequest,
    });
    // console.log("response", await response.json());
    const res = await response.json();
    // const { client_secret } = await response.json();
    const { client_secret } = res;
    console.log("client_secret", client_secret);
    // console.log("client_secret", res);
    return client_secret;
  };

  const handlePayPress = async () => {
    console.log("test");
    // Gather the customer's billing information (for example, email)
    const billingDetails: PaymentMethodCreateParams.BillingDetails = {
      email: "zxc@o2.pl",
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();
    console.log("test", clientSecret);

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      type: "Card",
      billingDetails,
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      console.log("Success from promise", paymentIntent);
    }
  };

  const handleOnSubmit = async () => {
    const uid = await firebase.auth().currentUser?.getIdToken();
    const uidd = await firebase.auth().currentUser?.uid;

    if (uid) {
      // const clientSecret = firebase
      //   .firestore()
      //   .collection("users")
      //   .doc(uid)
      //   .get()
      //   .then(async function (querySnapshot) {
      //     // console.log("asd");
      //   });

      // 2. Gather customer billing information (ex. email)
      const billingDetails: PaymentMethodCreateParams.BillingDetails = {
        email: "qwe@o2.pl",
        phone: "+48888000888",
        addressCity: "Houston",
        addressCountry: "US",
        addressLine1: "1459  Circle Drive",
        addressLine2: "Texas",
        addressPostalCode: "77063",
      }; // mocked data for tests

      // 3. Confirm payment with card details
      // The rest will be done automatically using webhooks
      const { error, paymentIntent } = await confirmPayment(
        "pi_3K7bhwI4IOxw6fNy0o0KRw1o_secret_5pBR0gYesQB8GBqStJgY8nLky",
        {
          type: "Card",
          billingDetails,
        }
      );

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        console.log("Payment confirmation error", error.message);
      } else if (paymentIntent) {
        Alert.alert(
          "Success",
          `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
        );
        console.log("Success from promise", paymentIntent);
      }
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        autofocus
        placeholder={{
          number: "4242 4242 4242 4242",
          postalCode: "12345",
          cvc: "CVC",
          expiration: "MM|YY",
        }}
        onCardChange={(cardDetails) => {
          console.log("card details", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
        style={styles.cardField}
        cardStyle={inputStyles}
      />
      <Button onPress={openPaymentSheet}>Pay</Button>
      <Text>asd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    marginLeft: 12,
  },
  input: {
    height: 44,
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 1.5,
  },
});

const inputStyles: CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: "#FFFFFF",
  borderColor: "#000000",
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: "#999999",
};

export default Payment;
