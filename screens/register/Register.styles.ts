import { Dimensions, StyleSheet } from "react-native";
import { IRegisterStyles } from "./Register.types";

export const styles = StyleSheet.create<IRegisterStyles>({
  formContainer: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: 300,
  },
  input: {
    marginTop: 15,
  },
  button: {
    width: 250,
    height: 70,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#E79A36",
    borderRadius: 15,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  errorBottomText: {
    color: "#F00",
    fontSize: 20,
  },
  errorBottomTextWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
});
