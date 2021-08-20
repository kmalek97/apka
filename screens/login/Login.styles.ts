import { StyleSheet } from "react-native";
import { ILoginStyles } from "./Login.types";

export const styles = StyleSheet.create<ILoginStyles>({
  formContainer: {
    alignItems: "center",
  },
  wrapper: {
    width: 300,
    marginTop: "40%",
  },
  errorBottomText: {
    color: "#F00",
    fontSize: 20,
  },
  errorBottomTextWrapper: {
    alignItems: "center",
    marginTop: 20,
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
});
