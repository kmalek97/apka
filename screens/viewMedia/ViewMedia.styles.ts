import { Dimensions, StyleSheet } from "react-native";
import { IViewMediaStyles } from "./ViewMedia.types";

const Dev_Height = Dimensions.get("window").height;
const Dev_Width = Dimensions.get("window").width;

export const styles = StyleSheet.create<IViewMediaStyles>({
  contanier: {
    height: Dev_Height,
    width: Dev_Width,
    justifyContent: "center",
  },
  mainbar: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nowPlayingText: {
    fontSize: 19,
  },
  musicLogoView: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageView: {
    height: "100%",
    width: "50%",
    borderRadius: 10,
    marginBottom: "30%",
  },
  nameOfSongView: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameOfSongText1: {
    fontSize: 19,
    fontWeight: "500",
  },
  nameOfSongText2: {
    color: "#808080",
    marginTop: "4%",
    marginBottom: "5%",
  },
  sliderView: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderStyle: {
    height: "70%",
    width: "60%",
  },
  sliderTime: {
    fontSize: 15,
    marginLeft: "6%",
    color: "#808080",
  },
  functionsView: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
